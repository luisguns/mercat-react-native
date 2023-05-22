import { StyleSheet } from "react-native";
import Colors from "../../../values/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.grayScale050,
    paddingHorizontal: 17,
  },
  individualInputText: {
    color: Colors.grayScale800,
    backgroundColor: Colors.grayScale050,
    width: "100%",
    height: 50,
    borderColor: Colors.primaryDark,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },

  inlineFormsImputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  inlineFormsImputItem: {
    color: Colors.grayScale800,
    backgroundColor: Colors.grayScale050,
    width: "48%",
    height: 50,
    borderColor: Colors.primaryDark,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "500",
  },

  topContainer: {
    alignSelf: "stretch",
  },

  bottomContainer: {},

  textNamePlace: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.grayScale900,
    marginTop: 32,
    marginStart: 4,
    alignSelf: "center",
  },
  textNameValuePlace: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.primaryDark,
    marginTop: 32,
    marginStart: 4,
    alignSelf: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: 226,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 64,
  },
  textButtonStyle: {
    fontSize: 16,
    color: Colors.light,
    fontWeight: "700",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 17,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  modalBody: {
    width: "100%",
    height: "50%",
    alignContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalFooter: {},
  modalContent: {
    marginTop: "-40%",
    flex: 1,
    flexDirection: "column",
  },
  textInline: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: 'flex-start'
  },
  headerModal: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
  },
  textLabelModal: {
    color: Colors.grayScale800,
    justifyContent: "flex-end",
    alignContent: "flex-start",
    textAlign: 'right',
    fontSize: 16,
    marginEnd: 10,
    flex: 1
  },
  textvalueModal: {
    color: Colors.grayScale900,
    fontSize: 16,
    fontWeight: "700",
    flex: 3,
  },
});
