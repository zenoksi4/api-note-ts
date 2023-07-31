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
        {id: '3', title: 'note3', created: new Date().toLocaleDateString('uk'), category:'Random Thought', content: 'notes3'},
        {id: '4', title: 'note4', created: new Date().toLocaleDateString('uk'), category:'Random Thought', content: 'notes4'},
        {id: '5', title: 'note5', created: new Date().toLocaleDateString('uk'), category:'Task', content: 'notes5'},
        {id: '6', title: 'note6', created: new Date().toLocaleDateString('uk'), category:'Idea', content: 'notes6'},
        {id: '7', title: 'note7', created: new Date().toLocaleDateString('uk'), category:'Task', content: 'notes7'},
    ],
};
