export const MainNav = [
    {
        icon: 'pe-7s-rocket',
        label: 'University App',
        to: '#/Dashboard',
    },
];
export const ComponentsNav = [
    {
        icon: 'pe-7s-box1',
        label: 'Dashboard',
        to: '#/Dashboard'
    }, {
        icon: 'pe-7s-study',
        label: 'Students',
        content: [
            {
                label: 'Student Details',
                to: '#/Menu/Students',
            },
            {
                label: 'Add Students',
                to: '#/Menu/Student/AddStudent',

            }
        ],
    },
    {
        icon: 'pe-7s-bookmarks',
        label: 'Teachers',
        content: [
            {
                label: 'Techer Details',
                to: '#/Menu/Teachers',
            },
            {
                label: 'Add Teachers',
                to: '#/Menu/Teachers/AddTeacher',
            }
        ],
    },
    {
        icon: 'pe-7s-paper-plane',
        label: 'Results',
        content: [
            {
                label: 'Results',
                to: '#/Menu/Results',
            }
        ],
    },
    {
        icon: 'pe-7s-notebook',
        label: 'Library',
        content: [
            {
                label: 'Library',
                to: '#/Menu/Library',
            }
        ],
    },
    {
        icon: 'pe-7s-music',
        label: 'Events',
        content: [
            {
                label: 'Events',
                to: '#/Menu/Events',
            }
        ],
    },
    {
        icon: 'pe-7s-copy-file',
        label: 'Examination',
        content: [
            {
                label: 'Examination',
                to: '#/Menu/Examination',
            }
        ],
    },
    {
        icon: 'pe-7s-notebook',
        label: 'Sports',
        content: [
            {
                label: 'Sports',
                to: '#/Menu/Sports',
            }
        ],
    },
    {
        icon: 'pe-7s-call',
        label: 'Contact',
        content: [
            {
                label: 'Contact',
                to: '#/Menu/Contact',
            }
        ],
    }
];
