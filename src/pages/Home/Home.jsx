import React from 'react'
import { Link } from 'react-router-dom';
import { useVideoData } from '../../contexts';
import styles from "./Home.module.css"

export const Home = () => {

    const { categoryData } = useVideoData();

    return (
        <div>
            <div className="videoListing">
                <h1 className={`${styles.heading}`} >Categories</h1>
                <div className="videoContainer">
                    {categoryData.map(({ _id, thumbnail, category }) => (
                        <Link className={`${styles.productLink}`} to={`/${category}`} key={_id}>
                            <div className={`${styles.thumbnailContainer}`}>
                                <img className="img-resp" src={thumbnail} alt={category} />
                                <div className={`${styles.categTitle}`}>
                                    {category !== "" ? <h4>{category}</h4> : ""}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
