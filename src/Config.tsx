import * as React from 'react';


import MultiSelect from "react-multi-select-component";



export interface DropDown2 {
    title: string;
    selected: any[];
    options: number[] | string[];
    selectFun: Function;
}
export class Dropdown2 extends React.Component<DropDown2> {

    render() {
        var opts: any = [];
        // console.log(this.props.options);
        this.props.options.forEach((value: number | string) => {
            if (value) 
            opts.push({
                label: value.toString(),
                value: value.toString()
            });
        });
        var selected: any = [];
        this.props.selected.forEach((value: number | string) => {
            if (value) 
            selected.push({
                label: value.toString(),
                value: value.toString()
            });
        });
        return (<div>
            <MultiSelect
                options={opts}
                value={selected}
                onChange={this.props.selectFun}
                labelledBy={"Select"}
                // isOpen={true}
                hasSelectAll={false}
            />
        </div>);
    }
}

interface DropDown {
    title: string;
    selected: any[];
    options: Map<string, number | string>;
    selectFun: Function;
}
class Dropdown extends React.Component<DropDown> {

    render() {
        var opts: any = [];
        // console.log(this.props.options);
        this.props.options.forEach((value: number | string, key: string) => {
            opts.push({ "label": value.toString(), "value": key });
        });
        return (<div>
            <h1>{this.props.title}</h1>
            <MultiSelect
                options={opts}
                value={this.props.selected}
                onChange={this.props.selectFun}
                labelledBy={"Select"}
                // isOpen={true}
                hasSelectAll={false}
            />
        </div>);
    }
}
interface PickerOpts {
    typeconfig: Map<string, Map<string, number | string>>;
    reRender: Function;
}
class Picker extends React.Component<PickerOpts> {
    state: {
        [n: string]: number[] | string[]
    } = {
            "yrsPicked": [],
            "locationsPicked": [],
            "eventsPicked": [],
        }

    lastMod: number = 0;
    setStuff = (b: string, a: number[] | string[]) => {
        this.setState({ [b]: a });
        var mod = Date.now();
        this.lastMod = mod;
        setTimeout(() => {
            if (this.lastMod === mod) {
                this.props.reRender(this.state);
            }
        }, 700);
    }

    render() {
        var rows: JSX.Element[] = [];
        var m: Map<string, Map<string, number | string>> = this.props.typeconfig;
        // console.log(m);
        m.forEach((value: Map<string, number | string>, key: string) => {
            var keystr: string = key.toString();
            rows.push(<Dropdown
                options={value} title={key}
                selected={this.state[keystr]}
                selectFun={(a: any) => { this.setStuff(keystr, a) }}
            />);
            // console.log(key, value);
        });
        return (
            <div> { rows}</div >
        );
    }
}

export default Picker;
