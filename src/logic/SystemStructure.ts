class Root {
    name: String = '/';
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }
}

interface Item {
    readonly name: String;
}

class Folder implements Item {
    readonly name: String;
    items: Item[];


    constructor(name: String, items?: Item[]) {
        this.name = name;
        this.items = items === undefined ? [] : items;
    }
}

class File implements Item{
    readonly name: String;
    content: String;

    constructor(name: String, content: String) {
        this.name = name;
        this.content = content;
    }
}

export {
    Root, Folder, File
}
