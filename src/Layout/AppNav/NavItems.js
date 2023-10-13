var x = localStorage.getItem('roleId');
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
            // x == 2 && 
            {
                label: 'Add Students',
                to: '#/Menu/Student/AddStudent',

           },
            // x == 2 && 
            {
                label: 'Import Students',
                to: '#/Menu/Student/ImportStudents',

            }
        ],
    },
    {
        icon: 'pe-7s-add-user',
        label: 'Teachers',
        content: [
            {
                label: 'Teacher Details',
                to: '#/Menu/Teachers',
            },
            // x == 2 &&
             {
                label: 'Add Teachers',
                to: '#/Menu/Teachers/AddTeacher',
            },
            // x == 2 && 
            {
                label: 'Import Teachers',
                to: '#/Menu/Teachers/ImportTeachers',

            }
        ],
    },
    {
        icon: 'pe-7s-date',
        label: 'Attendance',
        content: [
            {
                label: ' Check Attendance',
                to: '#/Menu/CheckAttendance',
            }, {
                label: 'Attendance List',
                to: '#/Menu/AttendanceList',
            },
            //  x == 2 && 
            {
                label: 'Import Attendance',
                to: '#/Menu/ImportAttendance',
            }
        ],
    },
    {
        icon: 'pe-7s-cash',
        label: 'Scholarship',
        content: [
            {
                label: 'Scholarship Status',
                to: '#/Menu/ScholarShipStatus',
            },
            // x == 2 && 
            {
                label: 'Import Scholarship',
                to: '#/Menu/ImportScholarShip',
            }
        ],
    }, {
        icon: 'pe-7s-cash',
        label: 'Fee',
        content: [
            {
                label: 'Check Fee',
                to: '#/Menu/CheckFee',
            },
            // x == 2 && 
            {
                label: 'Import Fee',
                to: '#/Menu/ImportFee',
            }
        ],
    },
    {
        icon: 'pe-7s-paper-plane',
        label: 'Results',
        content: [
            {
                label: 'Check Result',
                to: '#/Menu/Results/CheckResults',
            },
            // x == 2 && 
            {
                label: 'Import Results',
                to: '#/Menu/Results/ImportResults',
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
            },
            // x == 2 &&
             {
                label: 'Import Books',
                to: '#/Menu/Library/ImportBooks',
            }
        ],
    },
    {
        icon: 'pe-7s-music',
        label: 'Events',
        content: [
            {
                label: 'UpComing Events',
                to: '#/Menu/Events/UpComingEvents',
            }, {
                label: 'Past Events',
                to: "#/Menu/Events/PastEvents"
            },
            //  x == 2 && 
            {
                label: 'Add Events',
                to: '#/Menu/Events/AddEvents'
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
        icon: 'pe-7s-ball',
        label: 'Sports',
        content: [
            {
                label: 'Sports',
                to: '#/Menu/Sports',
            },
            {
                label: 'Add Sports',
                to: '#/Menu/AddSports'
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
    },
    {
        icon: 'pe-7s-photo-gallery',
        label: 'Reports',
        content: [
            {
                label: 'Reports',
                to: '#/Reports',
            }
        ],
    }
];
