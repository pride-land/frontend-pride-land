export let mode: string;
export let devtool: string;
export namespace entry {
    let main: string;
}
export namespace output {
    let path: string;
    let filename: string;
}
export namespace resolve {
    let extensions: string[];
}
export namespace module {
    let rules: {
        test: RegExp;
        loader: string;
    }[];
}
