class Root implements Container {
    name: string = '';
    items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }
}

export interface Item {
    readonly name: String;
}

export interface Container extends Item {
    items: Item[];
}

class Folder implements Container {
    readonly name: String;
    items: Item[];


    constructor(name: String, items?: Item[]) {
        this.name = name;
        this.items = items === undefined ? [] : items;
    }
}

class File implements Item {
    readonly name: String;
    content: String;

    constructor(name: String, content: String) {
        this.name = name;
        this.content = content;
    }
}

const cv = [
    {
        company: 'fme AG',
        role: 'Associate Consultant',
        start: '2019',
        end: 'until now'
    },
    {
        company: 'Dotsource',
        role: 'Software Engineer',
        start: '2019',
        end: '2019'
    }
];

function cvToString(): string {
    let result = '';
    cv.forEach(entry => {
        result += `${entry.role} at ${entry.company} (${entry.start} - ${entry.end})\n`;
    })

    return result;
}

const DefaultStructure: Root = new Root(
    [
        new Folder("user", [
            new Folder('cv', [
                new File('work', cvToString())
            ])
        ])
    ]
);

export {
    Root, Folder, File, DefaultStructure
}
