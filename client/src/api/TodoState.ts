export const db = {
    boards: [
        {
            id: 1,
            title: 'Kojo Board',
            members: [1, 2],
            cards: [1, 2],
            columns: ['Backlog', 'In Progress', 'Testing', 'Complete']
        }
    ],
    cards: [
        {
            id: 1,
            title: 'Move CSS items from styles.scss',
            category: 'CSS',
            description: 'THERE IS SHIT IN THERE THAT SHOULD NOT BE THERE..PLEASE FIX',
            column: 'Complete',
            assignment: [2],
            board: 1,
        },
        {
            id: 2,
            title: 'Create login',
            category: 'API',
            description: 'Create a javascript based login using the DB data structure provided in the FauxState.ts',
            column: 'Complete',
            assignment: [2],
            board: 1,
        },
        {
            id: 3,
            title: 'Format SCSS to &__ selectors',
            category: 'CSS',
            description: 'All items that belong only to one selector must use &__',
            column: 'Complete',
            assignment: [2],
            board: 1,
        },
        {
            id: 4,
            title: 'Add new card form',
            category: 'Front End Component',
            description: 'Adds shit to shit',
            column: 'Complete',
            assignment: [1],
            board: 1,
        },
        {
            id: 5,
            title: 'Add Header Bar with Logout',
            category: 'Front End Component',
            description: 'Add shit tos hit',
            column: 'Complete',
            assignment: [1],
            board: 1,
        },
        {
            id: 6,
            title: 'Edit new card form',
            category: 'Front End Component',
            description: 'Add shit to shit',
            column: 'Complete',
            assignment: [2],
            board: 1,
        },
        {
            id: 7,
            title: 'Add new card',
            category: 'API',
            description: 'Add new card to db object',
            column: 'Backlog',
            assignment: [1],
            board: 1,
        },
        {
            id: 8,
            title: 'Move state from column level to content level',
            category: 'Front End Component',
            description:
                'Set up the cardIndex and dropIndex at the content level. ' +
                'Create method at App.tsx level to slice array and add at new index point. ' +
                'Create method that iterates through array based on obj prop, but ignores drop index',
            column: 'In Progress',
            assignment: [1],
            board: 1,
        }
    ],
    users: [
        {
            id: 1,
            displayName: 'Kyoji',
            password: 'bacon',
            email: 'bacon@bacon.com'
        },
        {
            id: 2,
            displayName: 'Adrian',
            password: 'bacontoo',
            email: 'bacon@bacon2.com'
        }
    ]
};
