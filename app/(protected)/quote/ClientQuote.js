"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import useFormState from '../../../hooks/useFormState';
import { initialState } from './_initialState';


export default function ClientQuote({ session }) {
    const { values, handleChange, handleNestedChange, setValues } = useFormState(initialState);
    const [activeCard, setActiveCard] = useState('quote-info');
    const [isDesktop, setDesktop] = useState(false);
    const [activeBuilding, setActiveBuilding] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navItems = [
        { id: 'quote-info', label: 'Project Information' },
        { id: 'design-code', label: 'Design Codes' },
        { id: 'building-project', label: 'Building Project' },
        { id: 'bldg-layout', label: 'Main Bldg - Layout' },
        { id: 'bldg-extensions', label: 'Main Bldg - Extensions' },
        { id: 'bldg-partitions', label: 'Main Bldg - Partitions' },
        { id: 'bldg-options', label: 'Main Bldg - Options' },
        { id: 'bldg-cranes', label: 'Main Bldg - Cranes' },
        { id: 'bldg-openings', label: 'Main Bldg - Openings' },
        { id: 'accessories', label: 'Accessories' },
        { id: 'finalize-quote', label: 'Finalize Quote' },
    ];

    // Carousel Nav handlers
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : navItems.length - 1;
            setActiveCard(navItems[newIndex].id);
            return newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex < navItems.length - 1 ? prevIndex + 1 : 0;
            setActiveCard(navItems[newIndex].id);
            return newIndex;
        });
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        setActiveCard(navItems[index].id);
    };

    // Add/Remove Buildings
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

    useEffect(() => {
        setActiveCard(navItems[currentIndex].id);
        if (window.innerWidth > 1000) {
            setDesktop(true);
        } else {
            setDesktop(false);
        }

        const updateMedia = () => {
            if (window.innerWidth > 1000) {
                setDesktop(true);
            } else {
                setDesktop(false);
            }
        };
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, [currentIndex]);

    return (
        <main>
            <header>
                {isDesktop ?
                    <Link href="/dashboard" className={styles.leftBox}><FontAwesomeIcon icon={faHouse} size="2x" /></Link>
                    :
                    <Link href="/dashboard" className={styles.leftBox}><FontAwesomeIcon icon={faHouse} size="1x" /></Link>
                }


                <h1 className={styles.pageTitle}>Quote Input</h1>
                <p className={styles.rightBox}>{session.user.email}</p>
            </header>
            <div className={styles.inputBody}>
                {(isDesktop &&
                    <nav className={styles.sidebar}>
                        <button onClick={() => setActiveCard('quote-info')}>Project Information</button>
                        <button onClick={() => setActiveCard('design-code')}>Design Codes</button>
                        <button onClick={() => setActiveCard('building-project')}>Building Project</button>
                        <button onClick={() => setActiveCard('bldg-layout')}>Main Bldg - Layout</button>
                        <button onClick={() => setActiveCard('bldg-extensions')}>Main Bldg - Extensions</button>
                        <button onClick={() => setActiveCard('bldg-partitions')}>Main Bldg - Partitions</button>
                        <button onClick={() => setActiveCard('bldg-options')}>Main Bldg - Options</button>
                        <button onClick={() => setActiveCard('bldg-cranes')}>Main Bldg - Cranes</button>
                        <button onClick={() => setActiveCard('bldg-openings')}>Main Bldg - Openings</button>
                        <button onClick={() => setActiveCard('accessories')}>Accessories</button>
                        <button onClick={() => setActiveCard('finalize-quote')}>Finalize Quote</button>
                    </nav>
                )}
                <div className={styles.sectionContainer}>
                    <form onSubmit={handleSubmit}>
                        {/* Project Info Page */}
                        {(activeCard == "quote-info") &&
                            <section id="projectInfo">
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerName' >Customer Name:</label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        className={styles.textInput}
                                        value={values.customerName}
                                        onChange={handleChange}
                                        placeholder="Customer Name"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='contactName' >Contact Name:</label>
                                    <input
                                        type="text"
                                        id="contactName"
                                        name="contactName"
                                        className={styles.textInput}
                                        value={values.contactName}
                                        onChange={handleChange}
                                        placeholder="Contact Name"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerStreet' >Street Address:</label>
                                    <input
                                        type="text"
                                        id="customerStreet"
                                        name="customerStreet"
                                        className={styles.textInput}
                                        value={values.customerStreet}
                                        onChange={handleChange}
                                        placeholder="Street Address"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerCity' >City:</label>
                                    <input
                                        type="text"
                                        id="customerCity"
                                        name="customerCity"
                                        className={styles.textInput}
                                        value={values.customerCity}
                                        onChange={handleChange}
                                        placeholder="City"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerState' >State:</label>
                                    <input
                                        type="text"
                                        id="customerState"
                                        name="customerState"
                                        className={styles.textInput}
                                        value={values.customerState}
                                        onChange={handleChange}
                                        placeholder="State"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerZip' >Zip Code:</label>
                                    <input
                                        type="text"
                                        id="customerZip"
                                        name="customerZip"
                                        className={styles.textInput}
                                        value={values.customerZip}
                                        onChange={handleChange}
                                        placeholder="Zip"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerPhone' >Phone:</label>
                                    <input
                                        type="text"
                                        id="customerPhone"
                                        name="customerPhone"
                                        className={styles.textInput}
                                        value={values.customerPhone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerFax' >Fax:</label>
                                    <input
                                        type="text"
                                        id="customerFax"
                                        name="customerFax"
                                        className={styles.textInput}
                                        value={values.customerFax}
                                        onChange={handleChange}
                                        placeholder="Fax"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerCell' >Cell:</label>
                                    <input
                                        type="text"
                                        id="customerCell"
                                        name="customerCell"
                                        className={styles.textInput}
                                        value={values.customerCell}
                                        onChange={handleChange}
                                        placeholder="Cell"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='customerEmail' >Email:</label>
                                    <input
                                        type="text"
                                        id="customerEmail"
                                        name="customerEmail"
                                        className={styles.textInput}
                                        value={values.customerEmail}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectName' >Project Name:</label>
                                    <input
                                        type="text"
                                        id="projectName"
                                        name="projectName"
                                        className={styles.textInput}
                                        value={values.projectName}
                                        onChange={handleChange}
                                        placeholder="Project Name"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectFor' >Project For:</label>
                                    <input
                                        type="text"
                                        id="projectFor"
                                        name="projectFor"
                                        className={styles.textInput}
                                        value={values.projectFor}
                                        onChange={handleChange}
                                        placeholder="Project For"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectAddress' >Street Address:</label>
                                    <input
                                        type="text"
                                        id="projectAddress"
                                        name="projectAddress"
                                        className={styles.textInput}
                                        value={values.projectAddress}
                                        onChange={handleChange}
                                        placeholder="Address"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectCity' >City:</label>
                                    <input
                                        type="text"
                                        id="projectCity"
                                        name="projectCity"
                                        className={styles.textInput}
                                        value={values.projectCity}
                                        onChange={handleChange}
                                        placeholder="City"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectState' >State:</label>
                                    <input
                                        type="text"
                                        id="projectState"
                                        name="projectState"
                                        className={styles.textInput}
                                        value={values.projectState}
                                        onChange={handleChange}
                                        placeholder="State"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectZip' >Zip Code:</label>
                                    <input
                                        type="text"
                                        id="projectZip"
                                        name="projectZip"
                                        className={styles.textInput}
                                        value={values.projectZip}
                                        onChange={handleChange}
                                        placeholder="Zip"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='projectCounty' >County:</label>
                                    <input
                                        type="text"
                                        id="projectCounty"
                                        name="projectCounty"
                                        className={styles.textInput}
                                        value={values.projectCounty}
                                        onChange={handleChange}
                                        placeholder="County"
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='buildingUse' >Building Use:</label>
                                    <input
                                        type="text"
                                        id="buildingUse"
                                        name="buildingUse"
                                        className={styles.textInput}
                                        value={values.buildingUse}
                                        onChange={handleChange}
                                        placeholder="Building Use"
                                    />
                                </div>                                                               
                            </section>
                        }
                        {/* Design Code Page */}
                        {(activeCard == "design-code") &&
                            <section>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='buildingCode' >Building Code:</label>
                                    <input
                                        type="text"
                                        id="buildingCode"
                                        name="buildingCode"
                                        className={styles.textInput}
                                        value={values.buildingCode}
                                        onChange={handleChange}
                                        placeholder="Building Code"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='riskCategory' >Risk Category:</label>
                                    <input
                                        type="text"
                                        id="riskCategory"
                                        name="riskCategory"
                                        className={styles.textInput}
                                        value={values.riskCategory}
                                        onChange={handleChange}
                                        placeholder="Risk Category"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='collateralLoad' >Collateral Load:</label>
                                    <input
                                        type="text"
                                        id="collateralLoad"
                                        name="collateralLoad"
                                        className={styles.textInput}
                                        value={values.collateralLoad}
                                        onChange={handleChange}
                                        placeholder="Collateral Load"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='liveLoad' >Live Load:</label>
                                    <input
                                        type="text"
                                        id="liveLoad"
                                        name="liveLoad"
                                        className={styles.textInput}
                                        value={values.liveLoad}
                                        onChange={handleChange}
                                        placeholder="Live Load"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='deadLoad' >Dead Load:</label>
                                    <input
                                        type="text"
                                        id="deadLoad"
                                        name="deadLoad"
                                        className={styles.textInput}
                                        value={values.deadLoad}
                                        onChange={handleChange}
                                        placeholder="Dead Load"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='windLoad' >Wind Load:</label>
                                    <input
                                        type="text"
                                        id="windLoad"
                                        name="windLoad"
                                        className={styles.textInput}
                                        value={values.windLoad}
                                        onChange={handleChange}
                                        placeholder="Wind Load"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='exposure' >Exposure:</label>
                                    <input
                                        type="text"
                                        id="exposure"
                                        name="exposure"
                                        className={styles.textInput}
                                        value={values.exposure}
                                        onChange={handleChange}
                                        placeholder="Exposure"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='enclosure' >Enclosure:</label>
                                    <input
                                        type="text"
                                        id="enclosure"
                                        name="enclosure"
                                        className={styles.textInput}
                                        value={values.enclosure}
                                        onChange={handleChange}
                                        placeholder="Enclosure"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='groundLoad' >Ground Load:</label>
                                    <input
                                        type="text"
                                        id="groundLoad"
                                        name="groundLoad"
                                        className={styles.textInput}
                                        value={values.groundLoad}
                                        onChange={handleChange}
                                        placeholder="Ground Load"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='roofLoad' >Roof Load:</label>
                                    <input
                                        type="text"
                                        id="roofLoad"
                                        name="roofLoad"
                                        className={styles.textInput}
                                        value={values.roofLoad}
                                        onChange={handleChange}
                                        placeholder="Roof Load"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='thermalFactor' >Thermal Factor:</label>
                                    <input
                                        type="text"
                                        id="thermalFactor"
                                        name="thermalFactor"
                                        className={styles.textInput}
                                        value={values.thermalFactor}
                                        onChange={handleChange}
                                        placeholder="Thermal Factor"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='seismicCategory' >Seismic Category:</label>
                                    <input
                                        type="text"
                                        id="seismicCategory"
                                        name="seismicCategory"
                                        className={styles.textInput}
                                        value={values.seismicCategory}
                                        onChange={handleChange}
                                        placeholder="Seismic Category"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='seismicSs' >SeismicSs:</label>
                                    <input
                                        type="text"
                                        id="seismicSs"
                                        name="seismicSs"
                                        className={styles.textInput}
                                        value={values.seismicSs}
                                        onChange={handleChange}
                                        placeholder="SeismicSs"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='seismicS1' >SeismicS1:</label>
                                    <input
                                        type="text"
                                        id="seismicS1"
                                        name="seismicS1"
                                        className={styles.textInput}
                                        value={values.seismicS1}
                                        onChange={handleChange}
                                        placeholder="SeismicS1"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='seismicSms' >SeismicSms:</label>
                                    <input
                                        type="text"
                                        id="seismicSms"
                                        name="seismicSms"
                                        className={styles.textInput}
                                        value={values.seismicSms}
                                        onChange={handleChange}
                                        placeholder="SeismicSms"
                                    />
                                </div> 
                                <div className={styles.inputContainer}>
                                    <label htmlFor='seismicSm1' >SeismicSm1:</label>
                                    <input
                                        type="text"
                                        id="seismicSm1"
                                        name="seismicSm1"
                                        className={styles.textInput}
                                        value={values.seismicSm1}
                                        onChange={handleChange}
                                        placeholder="SeismicSm1"
                                    />
                                </div> 
                            </section>
                        }
                        {(activeCard == "building-project") &&
                            <section>
                                {/* Buildings section */}
                                {values.buildings.map((building, index) => (
                                    <div key={index} className={styles.buildingContainer}>     
                                        <input
                                            type="text"
                                            value={building.name}
                                                onChange={(e) => handleNestedChange(index, 'name', e.target.value)}
                                            placeholder="Building Name"
                                        />                                      
                                        <input
                                            type="text"
                                            value={building.name}
                                            onChange={(e) => handleNestedChange(index, 'name', e.target.value)}
                                            placeholder="Building Name"
                                        />                                        
                                        <input
                                            type="text"
                                            value={building.address}
                                            onChange={(e) => handleNestedChange(index, 'address', e.target.value)}
                                            placeholder="Building Address"
                                        />
                                        {values.buildings.length > 1 && index != 0 &&
                                            <button type="button" onClick={() => removeBuilding(index)}>Remove Building</button>
                                        }
                                        
                                    </div>
                                ))}
                                <button type="button" onClick={addBuilding}>Add Building</button>
                            </section>
                        }
                        {(activeCard == "bldg-layout") &&
                            <section>
                                {/* <input
                                    type="text"
                                    value={building.layout}
                                    onChange={(e) => handleNestedChange(index, 'layout', e.target.value)}
                                    placeholder="Building Layout"
                                /> */}
                            </section>
                        }
                        {(activeCard == "bldg-extensions") &&
                            <section>

                            </section>
                        }
                        {(activeCard == "bldg-partitions") &&
                            <section>

                            </section>
                        }
                        {(activeCard == "bldg-options") &&
                            <section>

                            </section>
                        }
                        {(activeCard == "bldg-cranes") &&
                            <section>

                            </section>
                        }
                        {(activeCard == "bldg-openings") &&
                            <section>

                            </section>
                        }
                        {(activeCard == "accessories") &&
                            <section>

                            </section>
                        }
                        {(activeCard == "finalize-quote") &&
                            <section>
                                <button type="submit">Submit Quote</button>                                
                            </section>
                        }
                    </form>
                </div>
                {!isDesktop && (
                    <nav className={styles.carouselNav}>
                        <button className={styles.navArrow} onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                        </button>
                        <div className={styles.carouselContainer}>
                            <div className={styles.carouselItem}>
                                {navItems[currentIndex].label}
                            </div>
                            <div className={styles.dotContainer}>
                                {navItems.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                                        onClick={() => handleDotClick(index)}
                                        aria-label={`Go to ${item.label}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <button className={styles.navArrow} onClick={handleNext}>
                            <FontAwesomeIcon icon={faChevronRight} size="2x" />
                        </button>
                    </nav>
                )}
            </div>
        </main>
    )
}
