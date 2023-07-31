export type NoteType = {
    id: string,
    title: string,
    created:string,
    category: string,
    content:string,
}

export const db: { notes: NoteType[]} = {
    notes: [
        {id: '1', title: 'note1', created: new Date().toLocaleDateString('uk'), category:'Task', content: 'notes1'},
        {id: '2', title: 'note2', created: new Date().toLocaleDateString('uk'), category:'Idea', content: 'notes2'},
        {id: '3', title: 'note3', created: new Date().toLocaleDateString('uk'), category:'Task', content: 'notes3'},
    ],
};
