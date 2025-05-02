import { inject } from "@angular/core";
import { RecipeFinderStore } from "../../store/recipe-finder.store";

/** Base contract for a component. Provides functions to manage observables and expose configuration and session */
export abstract class StatefulComponent {

  store = inject(RecipeFinderStore);
  
}
