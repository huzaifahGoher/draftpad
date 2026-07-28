import { DOMOutputSpec, Node, NodeSpec, Schema } from "prosemirror-model";

const returnParagraphElement = (node: Node) : DOMOutputSpec => {
    const p = document.createElement("p");
    p.setAttribute("linespacing", node?.attrs?.lineSpacing || "one");
    return {dom: p, contentDOM: p};
}

const pDom: DOMOutputSpec = ["p", 0];

const nodes = {
    doc: {
        content: "block+"
    } as NodeSpec,
    paragraph: {
        content: "inline*",
        group: "block",
        attrs: {
            lineSpacing: {default: "double", validate: "string"}
        },
        parseDOM: [{tag: "p"}],
        toDOM: (node: Node) => {
            const pElement = returnParagraphElement(node);
            return pElement;
        },
    } as NodeSpec,
    text: {
        group: "inline"
    } as NodeSpec
}

const marks = {};

export const schema = new Schema({nodes, marks});