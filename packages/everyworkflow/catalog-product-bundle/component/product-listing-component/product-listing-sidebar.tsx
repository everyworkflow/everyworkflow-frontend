/*
 * @copyright EveryWorkflow. All rights reserved.
 */

import { useContext, useCallback, useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  theme,
  Slider,
  Space,
  Menu,
  Divider,
  Checkbox,
  Popover,
  Tag,
} from "antd";
import { ProductListContext } from "@everyworkflow/catalog-product-bundle/context/product-list-context";
import CommonUtility from "@everyworkflow/store-panel-bundle/utils";

const formatter = (value: any) => `Rs. ${value}`;

// note: applied filter is just implmented for demo purpose..it will be refactored later

const ProductLisitngSideBar = () => {
  const router = useRouter();
  const { state } = useContext<any>(ProductListContext);
  const { token } = theme.useToken();

  const [applidFilter, setAppliedFilter] = useState<any>([]); // need to add proper typescript

  const getChildCategoryOptions = useCallback((): Array<any> => {
    let options: Array<any> = [];

    let count = 0;
    state.child_category?.options?.forEach((item: any) => {
      count++;
      options.push({
        label: <Link href={"/category/" + item.code}>{item?.label}</Link>,
        key: item?.code,
      });
    });

    return options;
  }, [state.child_category]);

  useEffect(() => {
    let mappedObject: any = [];
    if (router?.query?.filter) {
      const jsonString: any = router?.query?.filter || "{}";

      const filter = JSON.parse(jsonString);
      Object.keys(filter).forEach((item: any) => {
        mappedObject = [
          ...mappedObject,
          ...filter[item]?.map((item1: any) => {
            return {
              label: item,
              value:
                item === "price"
                  ? `Min Rs ${CommonUtility.formatPrice(String(item1))}`
                  : item1,
            };
          }),
        ];
      });
      setAppliedFilter(mappedObject);
    }
  }, []);

  const updateFilterRoute = (filter: any) => {
    if (typeof window !== "undefined") {
      const routeQuery: any = router.query ?? {};
      const url = new URL(window?.location?.toString());
      Object.keys(routeQuery).forEach((key) => {
        url.searchParams.set(key, routeQuery[key]);
      });

      url.searchParams.set("filter", JSON.stringify(filter));
      router.push(url.toString());
    }
  };

  const onFilterChange = (key: string, value: any) => {
    let filterObj: any = {};
    let routeQuery = {
      ...router.query,
    };
    if (routeQuery["filter"] && routeQuery["filter"] !== "undefined") {
      const routeFilter: any = routeQuery["filter"];
      if (routeFilter && typeof routeFilter === "string") {
        try {
          filterObj = JSON.parse(routeFilter);
        } catch (error) {
          filterObj = {};
        }
      }
    }
    filterObj[key] = value;
    updateFilterRoute(filterObj);
  };

  const onMultiSelectFilterChange = (
    key: string,
    value: any,
    setFilter = true
  ) => {
    if (setFilter) {
      setAppliedFilter([...applidFilter, { label: key, value: value }]);
    }
    let filterObj: any = {};
    let routeQuery = {
      ...router.query,
    };
    if (routeQuery["filter"] && routeQuery["filter"] !== "undefined") {
      const routeFilter: any = routeQuery["filter"];
      if (routeFilter && typeof routeFilter === "string") {
        try {
          filterObj = JSON.parse(routeFilter);
        } catch (error) {
          filterObj = {};
        }
      }
    }

    if (!Array.isArray(filterObj[key])) {
      filterObj[key] = [];
    }
    if (filterObj[key].includes(value)) {
      const valueIndex = filterObj[key].findIndex(
        (item: any) => item === value
      );
      if (valueIndex >= 0) {
        filterObj[key].splice(valueIndex, 1);
        filterObj[key] = Object.values(filterObj[key]);
      }
    } else {
      filterObj[key].push(value);
    }

    updateFilterRoute(filterObj);
  };

  const renderFilterItemUi = (item: any) => {
    if (item.code === "price") {
      return (
        <div style={{ padding: 8 }}>
          <Slider
            range
            tooltip={{
              formatter,
            }}
            defaultValue={
              state.filters?.price ??
              JSON.parse(router.query?.filter?.toString() ?? '{"price": null}').price ?? [
                item.min_price,
                item.max_price,
              ]
            }
            min={item.min_price ?? 0}
            max={item.max_price ?? 0}
            onAfterChange={(value) => {
              setAppliedFilter([
                ...applidFilter.filter((item: any) => item.label !== "price"),
                {
                  label: "price",
                  value: `Min Rs ${CommonUtility.formatPrice(String(value[0]))}`,
                },
                {
                  label: "price",
                  value: `Max Rs ${CommonUtility.formatPrice(String(value[1]))}`,
                },
              ]);
              onFilterChange("price", value);
            }}
          />
        </div>
      );
    }
    if (item.code === "color") {
      return (
        <div
          style={{
            paddingTop: token.padding,
            paddingBottom: token.padding,
          }}
        >
          <Space wrap={true}>
            {item?.options
              ?.sort((a: any, b: any) => a?.sort_order - b?.sort_order)
              ?.map((option: any, optionIndex: number) => (
                <Popover
                  key={optionIndex}
                  content={
                    <div>
                      <div
                        style={{
                          backgroundColor: option?.color_swatch,
                          width: 64,
                          height: 64,
                        }}
                      ></div>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {option?.label}
                      </div>
                    </div>
                  }
                >
                  <div
                    style={{
                      height: 32,
                      width: 32,
                      cursor: "pointer",
                      borderRadius: "100%",
                      backgroundColor: option?.color_swatch ?? "#fff",
                      boxShadow: token.boxShadowSecondary,
                    }}
                    onClick={() => {
                      onMultiSelectFilterChange(item.code, option.code);
                    }}
                  >
                    {state.filter[item.code]?.includes(option.code) && (
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CheckOutlined />
                      </div>
                    )}
                  </div>
                </Popover>
              ))}
          </Space>
        </div>
      );
    }

    return (
      <div style={{ padding: token.padding }}>
        <Space direction="vertical">
          {item?.options
            ?.sort((a: any, b: any) => a?.sort_order - b?.sort_order)
            ?.map((option: any, optionIndex: number) => (
              <Checkbox
                key={optionIndex}
                checked={state.filter[item.code]?.includes(option.code) ?? false}
                onChange={() => {
                  onMultiSelectFilterChange(item.code, option.code);
                }}
              >
                {option.label}
              </Checkbox>
            ))}
        </Space>
      </div>
    );
  };

  function handleButtonClick(item: any) {
    const { filter }: any = router.query;
    if (!filter) {
      return;
    }
    const parsedFilter = JSON.parse(filter);
    if (typeof parsedFilter[item.label] === "undefined") {
      return;
    }
    if (typeof parsedFilter[item.label][0] === "number") {
      const numericValue = Number(
        item.value.split("Rs")[1].trim().replace(",", "")
      );
      const newValueIndex = parsedFilter[item.label].indexOf(numericValue);
      if (newValueIndex < 0) {
        return;
      }
      parsedFilter[item.label].splice(newValueIndex, 1);
      if (parsedFilter[item.label].length === 0) {
        delete parsedFilter[item.label];
      }
      const newFilter =
        Object.keys(parsedFilter).length === 0
          ? null
          : JSON.stringify(parsedFilter);
      const newQuery = newFilter ? { filter: newFilter } : {};
      router.push({ pathname: router.pathname, query: newQuery });
    } else {
      const newValueIndex = parsedFilter[item.label].indexOf(item.value);
      if (newValueIndex < 0) {
        return;
      }
      if (parsedFilter[item.label].length === 1) {
        delete parsedFilter[item.label];
      } else {
        parsedFilter[item.label].splice(newValueIndex, 1);
      }
      const newFilter =
        Object.keys(parsedFilter).length === 0
          ? null
          : JSON.stringify(parsedFilter);
      const newQuery = newFilter ? { filter: newFilter } : {};
      router.push({ pathname: router.pathname, query: newQuery });
    }
  }

  // ant design tag is not working for some weird reason..where it is not showing filtered elements so made a custom..will need to look for this issue
  const Tag = ({ value, onClose }: any) => {
    return (
      <span
        style={{
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          color: "rgba(0,0,0,.88)",
          fontSize: 12,
          lineHeight: "20px",
          listStyle: "none",
          display: "inline-block",
          height: "auto",
          marginInlineEnd: 8,
          paddingInline: 7,
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,.02)",
          border: "1px solid #d9d9d9",
          borderRadius: 4,
          opacity: 1,
          transition: "all .2s",
          textAlign: "start",
          cursor: "pointer",
        }}
      >
        {value}
        {onClose && (
          <button
            type="button"
            style={{
              marginLeft: "8px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            x
          </button>
        )}
      </span>
    );
  };

  return (
    <>
      {applidFilter?.filter((item: any) => item.value !== "").length > 0 && (
        <Space direction="vertical">
          <label style={{ fontWeight: "bold" }}>Applied Filter</label>
          <Space size={[0, 8]} style={{ display: "flex", flexWrap: "wrap" }}>
            {applidFilter.map((item: any) => {
              return (
                <Tag
                  value={item.value}
                  onClose={() => {
                    setAppliedFilter(
                      applidFilter?.filter(
                        (item1: any) => item1.value !== item.value
                      )
                    );

                    handleButtonClick(item);
                  }}
                  style={{ textTransform: "capitalize", padding: 10 }}
                />
              );
            })}
          </Space>
          <Divider style={{ backgroundColor: "#f2f2f2" }} />
        </Space>
      )}
      {state.child_category && (
        <div
          className={
            "ln-filter-item ln-filter-item-attr-type-" +
            state.child_category?.type +
            " ln-filter-item-" +
            state.child_category?.code
          }
        >
          <label style={{ fontWeight: "bold" }}>
            {state.child_category?.label}
          </label>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              marginTop: token.padding,
              borderRight: 0,
              marginLeft: -4,
              backgroundColor: token.colorBgBase,
            }}
            items={getChildCategoryOptions()}
            onClick={(data) => {
              setAppliedFilter([
                ...applidFilter.filter(
                  (item: any) => item.label !== "category"
                ),
                {
                  label: "category",
                  value: data.key,
                },
              ]);
              onMultiSelectFilterChange("category", data.key);
            }}
          />
          <Divider style={{ backgroundColor: "#f2f2f2" }} />
        </div>
      )}
      {state?.filter_attributes
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
        ?.map((item: any, index: number) => (
          <div
            className={
              "ln-filter-item ln-filter-item-attr-type-" +
              item?.type +
              " ln-filter-item-" +
              item?.code
            }
            key={index}
          >
            <label style={{ fontWeight: "bold" }}>{item.label}</label>
            {renderFilterItemUi(item)}
            {state?.filter_attributes[index + 1] !== undefined && (
              <Divider style={{ backgroundColor: "#f2f2f2" }} />
            )}
          </div>
        ))}
    </>
  );
};

export default ProductLisitngSideBar;
