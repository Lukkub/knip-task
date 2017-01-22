import React from 'react';
import Header from '../../components/Header';
import './CoreLayout.scss';
import '../../styles/core.scss';
import { Card } from 'material-ui/Card';

export const CoreLayout = ({ children }) => (
    <div className="container text-center">
        <Card style={styles.mainCard}>
            <Header />
            <div className="core-layout__viewport">
                {children}
            </div>
        </Card>
    </div>
);

const styles = {
    mainCard: {
        margin: '2%'
    }
};

CoreLayout.propTypes = {
    children : React.PropTypes.element.isRequired
};

export default CoreLayout;
