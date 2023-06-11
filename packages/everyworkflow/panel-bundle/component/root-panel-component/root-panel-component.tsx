/*
 * @copyright EveryWorkflow. All rights reserved.
 */

"use client";

import { useReducer, useCallback, useEffect } from "react";
import { ConfigProvider, theme, Grid } from "antd";
import { panelState } from "@everyworkflow/panel-bundle/state/panel-state";
import PanelReducer, {
  ACTION_SET_SCREENS,
} from "@everyworkflow/panel-bundle/reducer/panel-reducer";
import PanelContext from "@everyworkflow/panel-bundle/context/panel-context";
import LocalStorage from "@everyworkflow/panel-bundle/service/local-storage";
import {
  CartContext,
  useCartContext,
} from "@everyworkflow/store-panel-bundle/context/cart-context";

const getInitThemeData = (
  initialThemeToken: any,
  canOverwriteThemeTokenFromLocationStorage = false
): any => {
  const storedTheme = LocalStorage.get("ew_theme", false) ?? "light";
  const storedThemeToken = LocalStorage.get("ew_theme_token");
  const antTheme: any = {
    theme: storedTheme,
    theme_token: initialThemeToken ?? {},
  };
  if (canOverwriteThemeTokenFromLocationStorage) {
    antTheme.theme_token = {
      ...antTheme.theme_token,
      ...storedThemeToken,
    };
  }

  return antTheme;
};

interface RootPanelComponentProps {
  initialThemeToken?: any;
  canOverwriteThemeTokenFromLocationStorage?: boolean;
  disableThemeProvider?: boolean;
  disableInlineThemeToken?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const RootPanelComponent = ({
  initialThemeToken,
  canOverwriteThemeTokenFromLocationStorage,
  disableThemeProvider,
  disableInlineThemeToken,
  children,
}: RootPanelComponentProps) => {
  const { state: cartState, dispatch: cartDispatch } = useCartContext();
  const screens = Grid.useBreakpoint();
  const [state, dispatch] = useReducer(PanelReducer, {
    ...panelState,
    ...getInitThemeData(
      initialThemeToken,
      canOverwriteThemeTokenFromLocationStorage
    ),
  });

  const getCssContent = useCallback(() => {
    let currentThemeToken = state.theme_token;
    currentThemeToken = {
      ...theme.defaultSeed,
      ...currentThemeToken,
    };

    let allVariables: any = {};
    if (state.theme === "dark") {
      allVariables = theme.darkAlgorithm(currentThemeToken);
    } else {
      allVariables = theme.defaultAlgorithm(currentThemeToken);
    }

    let rootcss: string = ":root { ";
    Object.keys(allVariables).forEach((key) => {
      let currentValue: any = allVariables[key];
      if (
        !key.startsWith("blue") &&
        !key.startsWith("green") &&
        !key.startsWith("cyan") &&
        !key.startsWith("magenta") &&
        !key.startsWith("pink") &&
        !key.startsWith("red") &&
        !key.startsWith("orange") &&
        !key.startsWith("yellow") &&
        !key.startsWith("volcano") &&
        !key.startsWith("geekblue") &&
        !key.startsWith("gold") &&
        !key.startsWith("lime") &&
        !key.startsWith("purple")
      ) {
        if (
          key.startsWith("fontSize") ||
          key.startsWith("size") ||
          key.startsWith("border") ||
          key.startsWith("controlHeight")
        ) {
          currentValue = currentValue + "px";
        }
        rootcss += "--" + key + ": " + currentValue + "; ";
      }
    });
    rootcss += "}";
    return rootcss;
  }, [state]);

  useEffect(() => {
    dispatch({
      type: ACTION_SET_SCREENS,
      payload: screens,
    });
  }, [screens, dispatch]);

  const getAntTheme = useCallback(() => {
    const antTheme: any = {
      token: state.theme_token,
    };

    if (state.theme === "dark") {
      antTheme["algorithm"] = theme.darkAlgorithm;
    } else {
      antTheme["algorithm"] = theme.defaultAlgorithm;
    }
    return antTheme;
  }, []);

  return (
    <PanelContext.Provider value={{ state, dispatch }}>
      <ConfigProvider theme={getAntTheme()}>{children}</ConfigProvider>
    </PanelContext.Provider>
  );
};

export default RootPanelComponent;
