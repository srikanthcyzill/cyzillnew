import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../config';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
import AgentCard from './AgentCard';

const FindAgents = () => {
    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${BASE_URL}/api/admin/agent`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAgents(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!agents.length) {
            fetchData();
        }
    }, [agents]);

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4 text-center">These are the Agents Currently Available</h1>
            <Input
                classNames={{
                    base: 'max-w-full sm:max-w-[15rem] h-10',
                    mainWrapper: 'h-full',
                    input: 'text-small',
                    inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                }}
                placeholder='Enter Agent name or Area or Agency'
                size='sm'
                startContent={<SearchIcon size={18} />}
                type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div>
                {agents
                    .filter(agent =>
                        (agent.agentName && agent.agentName.toLowerCase().includes(search.toLowerCase())) ||
                        (agent.agencyName && agent.agencyName.toLowerCase().includes(search.toLowerCase())) ||
                        (agent.serviceArea && agent.serviceArea.toLowerCase().includes(search.toLowerCase()))
                    )
                    .map((agent) => (
                        <AgentCard key={agent.id} agent={agent} /> // Use the AgentCard component
                    ))}
            </div>
        </div>
    );
};

export default FindAgents;
