
// interface History {
//     length: number;
//     action: Action;
//     location: Location;
//     push(path: Path, state?: LocationState): void;
//     push(location: LocationDescriptorObject): void;
//     replace(path: Path, state?: LocationState): void;
//     replace(location: LocationDescriptorObject): void;
//     go(n: number): void;
//     goBack(): void;
//     goForward(): void;
//     block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
//     listen(listener: LocationListener): UnregisterCallback;
//     createHref(location: LocationDescriptorObject): Href;
// }
// interface LocationDescriptorObject {
//     pathname?: Pathname;
//     search?: Search;
//     state?: LocationState;
//     hash?: Hash;
//     key?: LocationKey;
// }