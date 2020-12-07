import { Component } from 'react';

type IFProps = {
    condition:Boolean
}

class IF extends Component<IFProps>{

    static defaultProps = {
        condition: false
    }

    render() {
        if(this.props.condition){
            return (this.props.children);
        }else{
            return null;
        }
    }
    
}

export default IF;