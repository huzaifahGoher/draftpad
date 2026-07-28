import { splitBlock, deleteSelection, joinBackward, chainCommands, toggleMark } from "prosemirror-commands";
import { EditorView } from "prosemirror-view";
import { EditorState, Transaction } from "prosemirror-state";
import { schema } from "./schema";

export const customKeyMap = {
    "Enter": (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => {
        return splitBlock(state, dispatch, view);
    },
    "Backspace": chainCommands(deleteSelection, joinBackward),
    "Ctrl-b": toggleMark(schema.marks.strong),
    "Ctrl-i": toggleMark(schema.marks.italic),
    "Ctrl-u": toggleMark(schema.marks.underline),
}