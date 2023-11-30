import { Component } from "react";
import styles from "./Filter.module.css";

export class Filter extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <p className={styles.text}>Find contacts by name</p>
                <input
                    type="text"
                    name="filter"
                    onChange={this.props.changeFilter}
                    placeholder="Enter a name..."
                    className={styles.filter}
                />
            </div>
        );
    };
};
