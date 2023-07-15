import * as React from "react";
import * as styles from './index.scss';
import * as statusData from "../../statusData";

interface IProps {
  sData?: any,
  cData?: any,
  active?: any,
  bindClick: React.MouseEventHandler
}
export default React.memo((props: IProps) => {
  const { TABTITLE } = statusData
  const { sData = null, cData = null, active = 0, bindClick } = props

   const handleClick = (e) => {
    const { index } = e.currentTarget.dataset
    bindClick(index)
  }
  return ( 
    <div className={styles.tabWrap}>
      {
        TABTITLE && TABTITLE.length > 0 && TABTITLE.map((item, index) => {
          return (
            item.show &&
            <div className={active == index ? `${styles.item} ${styles.active}` : `${styles.item}`} key={index} data-index={index} onClick={handleClick}>
              <div className={styles.title}>{item.title}</div>
              {
                index == 0 && <div className={styles.tips}>季度目标值: { sData ? sData : '无'}</div>
              }
              { index == 1 && <div className={styles.tips}>季度目标值: { cData ? cData : '无'}</div>
              }
            </div>
          )
        })
      }
    </div>
  )
})