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
        start: '2019', end: 'until now'
    },
    {
        company: 'Dotsource',
        role: 'Software Engineer',
        start: '2019', end: '2019'
    },
    {
        company: 'fme AG',
        role: 'Working student',
        start: '2018', end: '2019'
    },
    {
        company: 'Elektrobit',
        role: 'Working student',
        start: '2017', end: '2018'
    },
    {
        company: 'Ostfalia Suderburg',
        role: 'Student',
        start: '2015', end: '2016'
    }
];

const university = [
    {
        name: 'FernUniversität Hagen',
        topic: 'Compter Science',
        final: 'Master Of Science',
        result: 'discontinued',
        start: '2019', end: '2020'
    },
    {
        name: 'Ostfalia Wolfenbüttel',
        topic: 'Computer Science',
        final: 'Bachelor Of Science',
        result: 'success',
        start: '2016', end: '2019'
    },
    {
        name: 'Ostfalia Suderburg',
        topic: 'Applied Computer Science',
        final: 'Bachelor Of Science',
        result: 'Switched university',
        start: '2015', end: '2016'
    }
];

function workCvToString(): string {
    let result = '';
    cv.forEach(entry => {
        result += `${entry.role} at ${entry.company} (${entry.start} - ${entry.end})\n`;
    })

    return result;
}

function universityToString(): string {
    let result = '';
    university.forEach(entry => {
        // noinspection LongLine
        result += `${entry.topic} (${entry.name}) | ${entry.final} - ${entry.result} from ${entry.start} until ${entry.end}\n`;
    })
    return result;
}

const DefaultStructure: Root = new Root(
    [
        new Folder("user", [
            new Folder('cv', [
                new File('work', workCvToString()),
                new File('university', universityToString())
            ])
        ])
    ]
);

export {
    Root, Folder, File, DefaultStructure
}
