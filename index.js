class ConsoleTree {
    constructor() {
        this.settings = {
            name: "name",
            items: "items"
        };
        this.maxLevel = 1000;
    }

    setPrefix(level, hasNext, parentPrefix = "") {
        return `${parentPrefix}${hasNext ? "├" : "└"}── `
    }

    setNextLinePrefix(parentPrefix = "", hasNext) {
        return `${parentPrefix}${hasNext ? "│" : " "}   `
    }

    parse(tree, level = 0, parentPrefix = "", treeStr = "") {
        if (!this.isValid(tree, level)) {
            return "";
        }
        if (Array.isArray(tree)) {
            tree.forEach((child, index) => {
                const hasNext = !!tree[++index];
                const children = child[this.settings.items];

                treeStr += `${this.setPrefix(level, hasNext, parentPrefix)}${child[this.settings.name]}\n`;

                if (children) {
                    treeStr += this.parse(children, ++level, this.setNextLinePrefix(parentPrefix, hasNext))
                }
            })
        } else {
            const children = tree[this.settings.items];
            treeStr += `${tree[this.settings.name]}\n`;
            if (children) {
                treeStr += this.parse(children, ++level)
            }
        }

        return treeStr;
    }

    isValid(tree, level) {
        if (typeof tree !== "object") {
            return false;
        }
        return level <= this.maxLevel;
    }

    log(tree) {
        console.log(this.parse(tree))
    }
}

const tree = {
    name: "1",
    items: [{
        name: "2",
        items: [{name: "3"}, {name: "4"}]
    }, {
        name: "5",
        items: [{name: "6"}]
    }]
}

const parser = new ConsoleTree();

parser.log(tree)