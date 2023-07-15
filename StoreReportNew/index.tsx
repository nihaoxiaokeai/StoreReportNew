import * as React from "react";
import * as qs from "query-string";
import Tab from "./components/Tab";
import Table from "./components/Table";

import * as styles from "./index.scss";
import * as api from "../../services/storeReport";

const { useState, useEffect } = React;
export default React.memo(() => {
  const [reportDate, setReportDate] = useState(null);
  const [tabIndex, setTabIndex] = useState(null);
  const [sData, setSData] = useState(null);
  const [cData, setCData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [dataType, setDataType] = useState(null);
  const [msgid, setMsgid] = useState(null);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  document.title = "百货数字化KPI考核报表";
  useEffect(() => {
    const params = qs.parse(window.location.search);
    const { msgid } = params;
    // const msgid = "fe54e50a-c0c0-402a-b483-583ae39ca191";
    setIsloading(true);
    setMsgid(msgid);
    getBHReportSale(msgid);
    getBHReportConnect(msgid, 0);
  }, []);

  // 在线销售比
  const getBHReportSale = (msgid) => {
    setIsloading(true);
    const p = Promise.race([
      api.getBHReportSale(msgid, true).then((res: any) => {
        setIsloading(false);
        setTabIndex(0);
        if (res) {
          document.title = res.pageTitle;
          setReportDate(res.reportDate);
          setTableData(res.bHReportDataTypeList);
          setTotal(res.bHReportDetailSaleSumGS);
          setSData(res.digiRateTarget);
          setDataType(res.dataType);
        } else {
          setTableData(null);
          setTotal(null);
        }
      }),
    ]);
    p.then((res) => {
      setIsloading(false);
      console.log(res);
    }).catch((err) => {
      setIsloading(false);
      // setError(err.message)
    });
  };
  // 顾客连接
  const getBHReportConnect = (msgid, type) => {
    setIsloading(true);
    const p = Promise.race([
      api.getBHReportConnect(msgid, true).then((res: any) => {
        setIsloading(false);
        if (res) {
          document.title = res.pageTitle;
          setReportDate(res.reportDate);
          setCData(res.contRateTarget);
          setDataType(res.dataType);
          if (type) {
            setTabIndex(1);
            setTableData(res.bHReportDataTypeList);
            setTotal(res.bHReportDetailConnectSumGS);
          }
        } else {
          if (type) {
            setTableData(null);
            setTotal(null);
          }
        }
      }),
    ]);
    p.then((res) => {
      setIsloading(false);
      console.log(res);
    }).catch((err) => {
      setIsloading(false);
      //  setError(err.message);
    });
  };

  const bindClick = (index) => {
    setTabIndex(index);
    if (tabIndex == index) {
      return;
    }
    setTotal(null);
    if (index == 1) {
      getBHReportConnect(msgid, 1);
    } else {
      getBHReportSale(msgid);
    }
  };

  return (
    <>
      {reportDate && <div className={styles.reportDate}>{reportDate}</div>}
      <Tab
        bindClick={bindClick}
        active={tabIndex}
        sData={sData}
        cData={cData}
      />
      {tabIndex == 1 && (
        <Table
          data={tableData}
          dataType={dataType}
          active={tabIndex}
          total={total}
          isLoading={isLoading}
        />
      )}
      {!tabIndex && (
        <Table
          data={tableData}
          dataType={dataType}
          active={tabIndex}
          total={total}
          isLoading={isLoading}
        />
      )}
    </>
  );
});
