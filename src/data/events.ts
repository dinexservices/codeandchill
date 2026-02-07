
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string; // Placeholder for now, can be a color gradient or actual image url
    color: string;
    link: string;
}

export const events: Event[] = [
    {
        id: 'code-and-chill',
        title: 'Code & Chill 2.0',
        description: 'The ultimate 24-hour AI innovation hackathon. Build solutions for real-world Bharat challenges.',
        date: 'To Be Announced',
        time: '24 Hours',
        location: 'Offline',
        image: 'from-cyan-500 to-blue-600',
        color: 'cyan',
        link: '/events/code-and-chill'
    },
    // {
    //     id: 'collabify',
    //     title: 'Collabify',
    //     description: 'A networking event connecting student developers with industry leaders and potential co-founders.',
    //     date: 'Coming Soon',
    //     time: '4 Hours',
    //     location: 'Auditorium',
    //     image: 'from-purple-500 to-pink-600',
    //     color: 'purple',
    //     link: '/events/collabify'
    // },
    // {
    //     id: 'conclave',
    //     title: 'Tech Conclave',
    //     description: 'Expert sessions on the future of AI, Web3, and Sustainable Tech featuring guest speakers.',
    //     date: 'Coming Soon',
    //     time: '10:00 AM - 4:00 PM',
    //     location: 'Main Hall',
    //     image: 'from-amber-400 to-orange-500',
    //     color: 'amber',
    //     link: '/events/conclave'
    // }
];
