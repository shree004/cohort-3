import React from 'react';
//give a faalback UI when a child component crashes instead of the whole site going down
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

const BuggyComponent = () => {
    throw new Error("I crashed!");
};

const Fav1 = () => {
    return (
        <h1>hello</h1>
    )
}

const App = () => {
    return (
        <div>
            <ErrorBoundary>
                <BuggyComponent />
                <Fav1 />
            </ErrorBoundary>
            <Fav1 />
        </div>
    );
};

export default App;