import { Text } from "react-native";

export const B = (props: { children: string }) => (
    <Text style={{ fontWeight: "900" }}>{props.children}</Text>
);