import {
  DOMOutputSpec,
  MarkSpec,
  Node,
  NodeSpec,
  Schema,
} from "prosemirror-model";

const returnParagraphElement = (node: Node): DOMOutputSpec => {
  const p = document.createElement("p");
  p.setAttribute("linespacing", node?.attrs?.lineSpacing || "one");
  return { dom: p, contentDOM: p };
};

const nodes = {
  doc: {
    content: "block+",
  } as NodeSpec,
  paragraph: {
    content: "inline*",
    group: "block",
    attrs: {
      lineSpacing: { default: "double", validate: "string" },
    },
    parseDOM: [{ tag: "p" }],
    toDOM: (node: Node) => {
      const pElement = returnParagraphElement(node);
      return pElement;
    },
  } as NodeSpec,
  heading: {
    content: "inline*",
    group: "block",
    attrs: {
      level: { default: 1 },
    },
    parseDOM: [
      { tag: "h1", attrs: { level: 1 } },
      { tag: "h2", attrs: { level: 2 } },
      { tag: "h3", attrs: { level: 3 } },
      { tag: "h4", attrs: { level: 4 } },
      { tag: "h5", attrs: { level: 5 } },
      { tag: "h6", attrs: { level: 6 } },
    ],
    toDOM: (node:Node) => {
      return [`h${node.attrs.level}`, 0];
    },
  } as NodeSpec,
  text: {
    group: "inline",
  } as NodeSpec,
};

const marks = {
  strong: {
    toDOM() {
      return ["strong", 0];
    },
    parseDOM: [{ tag: "strong" }, { tag: "b" }, { style: "font-weight=bold" }],
  } as MarkSpec,
  em: {
    toDOM() {
      return ["em", 0];
    },
    parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
  } as MarkSpec,
  underline: {
    toDOM() {
      return ["u", 0];
    },
    parseDOM: [{ tag: "u" }, { style: "text-decoration=underline" }],
  } as MarkSpec,
};

export const schema = new Schema({ nodes, marks });
