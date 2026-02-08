
export interface Event {
    id: string;
    title: string;
    shortDescription?: string; // Optional for now
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    color: string;
    link: string;
}

export const events: Event[] = [
    {
        id: 'code-and-chill',
        title: 'Code & Chill 2.0',
        shortDescription: 'The ultimate 24-hour AI innovation hackathon.',
        description: 'The ultimate 24-hour AI innovation hackathon. Build solutions for real-world Bharat challenges. Join us for a day of coding, networking, and fun.',
        date: 'March 22, 2026',
        time: '10:00 AM - 10:00 AM (Next Day)',
        location: 'Main Auditorium, Tech Campus',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
        color: 'cyan',
        link: '/events/code-and-chill'
    },

    {
        id: 'ai-workshop',
        title: 'GenAI Workshop',
        shortDescription: 'Hands-on workshop on Generative AI models.',
        description: 'Deep dive into LLMs and Generative AI. Learn to build your own custom models and fine-tune them for specific tasks.',
        date: 'April 05, 2026',
        time: '11:00 AM - 3:00 PM',
        location: 'Lab 3, CS Department',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
        color: 'emerald',
        link: '/events/ai-workshop'
    },
    {
        id: 'web3-summit',
        title: 'Web3 Summit',
        shortDescription: 'Decentralizing the future with Blockchain.',
        description: 'A gathering of blockchain enthusiasts, developers, and investors. Discussing DeFi, NFTs, and the future of the internet.',
        date: 'May 12, 2026',
        time: '9:00 AM - 5:00 PM',
        location: 'City Convention Center',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop',
        color: 'blue',
        link: '/events/web3-summit'
    }
];
