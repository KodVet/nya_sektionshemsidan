export const pages = [
    {
        btnName: 'Start',
        url: '/',
        childPages: []
    },
    {
        btnName: 'Om sektionen',
        url: '/sektionen',
        childPages: [
            {
                btnName: 'Styrelsen',
                url: '/sektionen/styrelsen',
            },
            {
                btnName: 'Kodvet',
                url: '/sektionen/kodvet',
            },
            {
                btnName: 'Kognitivet',
                url: '/sektionen/kognitivet',
            },
            {
                btnName: 'KVIT',
                url: '/sektionen/kvit',
            },
            {
                btnName: 'Utbildningsutskottet',
                url: '/sektionen/utbildningsutskottet',
            }
        ]
    },
    {
        btnName: 'För sökande',
        url: '/student',
        childPages: [
            {
                btnName: 'Boende',
                url: '/student/boende',
            },
            {
                btnName: 'Om programmet',
                url: '/student/omprogrammet',
            },
            {
                btnName: 'Studentliv',
                url: '/student/studentliv',
            },
            {
                btnName: 'FAQ',
                url: '/student/faq',
            }
        ]
    },
    {
        btnName: 'För medlemmar',
        url: '/medlemmar',
        childPages: [
            {
                btnName: 'Anslagstavlan',
                url: '/medlemmar/anslagstavlan',
            },
            {
                btnName: 'Arbetsmiljö',
                url: '/medlemmar/arbetsmiljö',
            },
            {
                btnName: 'kalender',
                url: '/medlemmar/kalender',
            },
            {
                btnName: 'Klagolådan',
                url: '/medlemmar/klagolådan',
            },
            {
                btnName: 'Koggidoren',
                url: '/medlemmar/koggidoren',
            },
            {
                btnName: 'kurser',
                url: '/medlemmar/kurser',
            },
            {
                btnName: 'Mötesdokument',
                url: '/medlemmar/mötesdokument',
            },
            {
                btnName: 'STUFF',
                url: '/medlemmar/stuff',
            },
            {
                btnName: 'Utbyte',
                url: '/medlemmar/utbyte',
            }
        ]
    },
    {
        btnName: 'Kontakt',
        url: '/kontakt',
        childPages: []
    },
]