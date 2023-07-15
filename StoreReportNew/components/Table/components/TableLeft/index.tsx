import * as React from "react";
import * as styles from "./index.scss";
import * as statusData from "../../../../statusData";

interface IProps {
  titles: any,
  data: any,
  fixedTop?: any,
  total?: any,
  active?: any,
  bindClick?: React.MouseEventHandler,
  fixedleft?: any
}
export default React.memo((props: IProps) => {
  // 每个分组的详细列表
  const { data = [], titles = '', total = null, fixedTop = 0, active = 0, bindClick, fixedleft= 0 } = props
  const { STITLE, CTITLE } = statusData
console.info('total',total)
  const getData = () => {
    let data =  STITLE
    if (active == 1) {
      data = CTITLE
    }
    return {
      listName: data.listName,
      sumName: data.sumName
    }
  }
    
  const { sumName, listName } = getData()

  const isShowMore = (e) => {
    const { index } = e.currentTarget.dataset
    bindClick(index)
  }

  console.info('111', fixedTop)

  return (
    <div className={fixedleft > 10 ? `${styles.wrap} ${styles.shadow}` : `${styles.wrap}`}>
      <div className={fixedTop > 1 ? `${styles.title} ${styles.fixed}` : `${styles.title}`} >
        <tr className={styles.tr}>
          <td className={styles.td}>
            <span className={styles.tag}>{titles}</span>
          </td>
        </tr>
      </div>
      <div className={styles.content} style={fixedTop > 1 ? {marginTop: `${-(fixedTop)}px`} : {}}>
        {data && data.length > 0 &&
          data.map((item, index) => {
            const list = item[listName]
            const sum = item[sumName]
            return (
              <tr className={styles.tr} key={index}>
                {
                  sum &&
                   (list && list.length > 0 ? <td className={styles.item}>
                      <span className={item.show ? `${styles.tagUp}` : `${styles.tag}`} data-index={index} onClick={(e) => isShowMore(e)}>{sum.dataTypeName}</span>
                    </td>
                    : <td className={styles.item}>
                      <span className={styles.name}>{sum.dataTypeName}</span>
                    </td>)
                  }
                {
                  list && list.length > 0 && list.map((_item, _index) => {
                  return (
                    item.show && <td className={`${styles.item} ${styles.detail}`} >{_item.dataTypeName}</td>
                  )
                  })
                }
              </tr>
            );
          })}
          {
            total && <tr className={`${styles.tr} ${styles.total}`}><td className={styles.item}>{total.dataTypeName}</td></tr>
          }
      </div>
    </div>
  );
});
