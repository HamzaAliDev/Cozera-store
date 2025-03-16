import React from 'react'
import { Link, useLocation } from 'react-router-dom';


export default function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x); // Remove empty values

    return (
        < section className="breadcrumb-option" style={{ backgroundColor: '#f3f2ee', padding: "40px 0px" }}>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/' >Home</Link></li>
                        {/* Dynamic Breadcrumb Links */}
                        {pathnames.map((name, index) => {
                            // Build the link for each segment
                            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? "page" : undefined}>
                                    {isLast ? (
                                        <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span> // Capitalize name
                                    ) : (
                                        <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </section>

    )
}
