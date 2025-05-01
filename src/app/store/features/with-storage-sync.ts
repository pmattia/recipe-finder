import {
    effect,
    EnvironmentInjector,
    inject,
    runInInjectionContext,
    Type
} from '@angular/core';
import {
    EmptyFeatureResult,
    getState,
    patchState,
    signalStoreFeature,
    SignalStoreFeature,
    SignalStoreFeatureResult,
    withHooks,
    withMethods,
} from '@ngrx/signals';
import {
    StorageService,
} from '../../services/storage-service.interface';

export type WithStorageSyncFeatureResult = EmptyFeatureResult & {
    methods: {
        clearStorage(): void;
        readFromStorage(): void;
        writeToStorage(): void;
    };
};


/**
 * Enables store synchronization with storage.
 *
 * Only works on browser platform.
 */


export function withStorageSync<
    State extends object,
    Input extends SignalStoreFeatureResult
>(
    key: string,
    StorageServiceClass: Type<StorageService>,
    selectState: (state: State) => Partial<State> = (state) => state // Default: full state
): SignalStoreFeature<
    Input,
    WithStorageSyncFeatureResult
> {

    return signalStoreFeature(
        withMethods(
            (
                store,
                storageService = inject(StorageServiceClass)
            ) => {

                return {
                    /**
                     * Removes the item stored in storage.
                     */
                    async clearStorage(): Promise<void> {
                        await storageService.clear(key);
                    },
                    /**
                     * Reads item from storage and patches the state.
                     */
                    async readFromStorage(): Promise<void> {
                        const stateString = await storageService.getItem(key);

                        if (stateString) {
                            patchState(store, JSON.parse(stateString));
                        }
                    },
                    /**
                     * Writes selected portion to storage.
                     */
                    async writeToStorage(): Promise<void> {
                        const fullState = getState(store) as State;
                        const slicedState = selectState(fullState); // Use the selector function
                        await storageService.setItem(key, JSON.stringify(slicedState));
                    },
                };
            }
        ),
        withHooks({
            onInit(
                store,
                envInjector = inject(EnvironmentInjector)
            ) {
                store.readFromStorage().then(() => {
                    Promise.resolve().then(async () => {
                        runInInjectionContext(envInjector, () => {
                            effect(() => {
                                store.writeToStorage();
                            });
                        });
                    });
                });
            },
        })
    );
}