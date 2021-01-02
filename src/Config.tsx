import * as React from 'react';


import MultiSelect from "react-multi-select-component";



export interface DropDown {
    title: string;
    selected: any[];
    options: number[] | string[];
    selectFun: Function;
}
export class Dropdown extends React.Component<DropDown> {

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
export default Dropdown;