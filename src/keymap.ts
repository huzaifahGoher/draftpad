import { splitBlock, deleteSelection, joinBackward, chainCommands, toggleMark, setBlockType } from "prosemirror-commands";
import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";
import { schema } from "./schema";

export const customKeyMap = {
    "Enter": (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => {
        return splitBlock(state, dispatch, view);
    },
    "Backspace": chainCommands(deleteSelection, joinBackward),
    "Ctrl-b": toggleMark(schema.marks.strong),
    "Ctrl-i": toggleMark(schema.marks.em),
    "Ctrl-u": toggleMark(schema.marks.underline),
    "Alt-1": setBlockType(schema.nodes.heading, {level: 1}),
    "Alt-2": setBlockType(schema.nodes.heading, {level: 2}),
    "Alt-3": setBlockType(schema.nodes.heading, {level: 3}),
    "Alt-4": setBlockType(schema.nodes.heading, {level: 4}),
    "Alt-5": setBlockType(schema.nodes.heading, {level: 5}),
    "Alt-6": setBlockType(schema.nodes.heading, {level: 6}),
    "Alt-0": setBlockType(schema.nodes.paragraph),
}