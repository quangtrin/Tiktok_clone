import { Tabs } from "antd";
import './LibraryCustom.scss'
const TabbarCustomAntd = ({items, size}) => {
    return (
        <Tabs
            id="Profile"
            defaultActiveKey="1"
            items={items}
            tabBarStyle={{ fontWeight: 'bold' }}
            size={size}
        />
    );
};

export default TabbarCustomAntd;