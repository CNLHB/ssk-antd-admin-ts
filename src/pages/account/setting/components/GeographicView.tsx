import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import { LabeledValue } from 'antd/es/select';
import { GeographicItemType } from '../data.d';
import styles from './GeographicView.module.less';


const { Option } = Select;

const nullSelectItem: LabeledValue = {
    label: '',
    value: '',
    key: '',
};

interface GeographicViewProps {
    province?: GeographicItemType[];
    city?: GeographicItemType[];
    value?: {
        province: LabeledValue;
        city: LabeledValue;
    };
    loading?: boolean;
    onChange?: (value: { province: LabeledValue; city: LabeledValue }) => void;
}

class GeographicView extends Component<GeographicViewProps> {
    componentDidMount = () => {

    };

    componentDidUpdate(props: GeographicViewProps) {
        const { value } = this.props;

        if (!props.value && !!value && !!value.province) {

        }
    }

    getProvinceOption() {
        const { province } = this.props;
        if (province) {
            return this.getOption(province);
        }
        return [];
    }

    getCityOption = () => {
        const { city } = this.props;
        if (city) {
            return this.getOption(city);
        }
        return [];
    };

    getOption = (list: GeographicItemType[]) => {
        if (!list || list.length < 1) {
            return (
                <Option key={0} value={0}>
                    没有找到选项
                </Option>
            );
        }
        return list.map((item) => (
            <Option key={item.id} value={item.id}>
                {item.name}
            </Option>
        ));
    };

    selectProvinceItem = (item: LabeledValue) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange({
                province: item,
                city: nullSelectItem,
            });
        }
    };

    selectCityItem = (item: LabeledValue) => {
        const { value, onChange } = this.props;
        if (value && onChange) {
            onChange({
                province: value.province,
                city: item,
            });
        }
    };

    conversionObject() {
        const { value } = this.props;
        if (!value) {
            return {
                province: nullSelectItem,
                city: nullSelectItem,
            };
        }
        const { province, city } = value;
        return {
            province: province || nullSelectItem,
            city: city || nullSelectItem,
        };
    }

    render() {
        const { province, city } = this.conversionObject();
        // const { loading } = this.props;
        const loading = false;

        return (
            <Spin spinning={loading} wrapperClassName={styles.row}>
                <Select
                    className={styles.item}
                    value={province}
                    labelInValue
                    showSearch
                    onSelect={this.selectProvinceItem}
                >
                    {this.getProvinceOption()}
                </Select>
                <Select
                    className={styles.item}
                    value={city}
                    labelInValue
                    showSearch
                    onSelect={this.selectCityItem}
                >
                    {this.getCityOption()}
                </Select>
            </Spin>
        );
    }
}

export default GeographicView
