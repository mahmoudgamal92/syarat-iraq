import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@constants/colors";

type TabItem = {
    id: string | number;
    title: string;
};

type TabberProps = {
    data: TabItem[];
    selected: string | number;
    onSelect: (id: string | number) => void;
};

export const Tabber: React.FC<TabberProps> = ({
    data,
    selected,
    onSelect,
}) => {
    // calculate width percent dynamically
    const widthPercent = 100 / data.length; // Use a number instead of a string

    return (
        <View style={styles.tabber}>
            {data.map((item, index) => {
                const isSelected = selected === item.id; // keep exact type check
                return (
                    <TouchableOpacity
                        key={String(item.id)}
                        onPress={() => onSelect(item.id)}
                        style={[
                            styles.tabItem,
                            {
                                backgroundColor: isSelected
                                    ? colors.light.purple
                                    : colors.light.whiteGrey,
                                borderLeftWidth: index !== 0 ? 1 : 0,
                                width: `${widthPercent}%`, // Convert back to string with percentage for styling
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {
                                    color: isSelected
                                        ? colors.light.whiteGrey
                                        : colors.light.purple,
                                },
                            ]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
