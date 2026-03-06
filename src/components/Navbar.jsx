import React from 'react';
import { StaggeredMenu } from './StaggeredMenu';

export default function Navbar() {
    const navItems = [
        { label: 'Home', link: '/' },
        { label: 'Collection', link: '/collection' }
    ];

    const socialLinks = [
        { label: 'Instagram', link: '#' },
        { label: 'Twitter', link: '#' },
        { label: 'Facebook', link: '#' }
    ];

    return (
        <StaggeredMenu
            isFixed={true}
            items={navItems}
            socialItems={socialLinks}
            logoUrl=""
            menuButtonColor="#ffffff"
            openMenuButtonColor="#000000"
            accentColor="#000000"
            position="right"
            colors={['#f3f4f6', '#e5e7eb']}
        />
    );
}
