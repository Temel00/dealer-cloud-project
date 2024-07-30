"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import useFormState from '../../../hooks/useFormState';
import { initialState } from './_initialState';


export default function ClientQuote({ session }) {
    const {values, handleChange, handleNestedChange, setValues} = useFormState(initialState);

    const addBuilding = () => {
        setValues(prev => ({
          ...prev,
          buildings: [...prev.buildings, { name: '', address: '' /* other fields */ }]
        }));
      };
    
    const removeBuilding = (index) => {
    setValues(prev => ({
        ...prev,
        buildings: prev.buildings.filter((_, i) => i !== index)
    }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', values);
    // Here you would typically send the data to your backend
    };

    return (
        <main>
            <header>
                <Link href="/dashboard" className={styles.leftBox}><FontAwesomeIcon icon={faHouse} size="2x" /></Link>
                <h1>Quote Input</h1>
                <p className={styles.rightBox}>Welcome, {session.user.email}</p>
            </header>
            <div className={styles.inputBody}>
                <nav className={styles.sidebar}>
                    <button>Project Information</button>
                    <button>Design Codes</button>
                    <button>Project Layout</button>
                    <button>Main Building</button>
                    <button>Options</button>
                    <button>Cranes</button>
                    <button>Mezzanines</button>
                    <button>Partitions</button>
                    <button>Openings</button>
                    <button>Finalize</button>
                </nav>
                <div className={styles.sectionContainer}>
                    <form onSubmit={handleSubmit}>
                        <section id="projectInfo">
                            <input type="text"
                                className={styles.textInput}
                                id="projectName"
                                name="projectName"
                                placeholder="Project Name"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="contactName"
                                value={values.contactName}
                                onChange={handleChange}
                                placeholder="Contact Name"
                            />
                            {/* Buildings section */}
                            {values.buildings.map((building, index) => (
                                <div key={index}>
                                {/* Example of an input using handleNestedChange */}
                                <input
                                    type="text"
                                    value={building.name}
                                    onChange={(e) => handleNestedChange(index, 'name', e.target.value)}
                                    placeholder="Building Name"
                                />

                                {/* Another example of handleNestedChange */}
                                <input
                                    type="text"
                                    value={building.address}
                                    onChange={(e) => handleNestedChange(index, 'address', e.target.value)}
                                    placeholder="Building Address"
                                />

                                <button type="button" onClick={() => removeBuilding(index)}>Remove Building</button>
                                </div>
                            ))}

                            <button type="button" onClick={addBuilding}>Add Building</button>

                            <button type="submit">Submit Quote</button>
                        </section>
                    </form>                    
                </div>
            </div>
        </main>
    )
}
