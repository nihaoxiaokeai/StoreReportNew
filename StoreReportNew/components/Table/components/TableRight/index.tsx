import * as React from "react";
import * as styles from "./index.scss";
import * as statusData from "../../../../statusData";

interface IProps {
  data: any;
  active?: any;
  total?: any;
  fixedTop?: any;
  fixedleft?: any;
}

export default React.memo((props: IProps) => {

  // 每个分组的详细列表
  const { data = [], total = null, fixedTop = 0, fixedleft = 0, active = 0 } = props
  const { STITLE, CTITLE } = statusData
  const getData = () => {
    let data =  STITLE
    if (active == 1) {
      data = CTITLE
    }
    return {
      titles: data.title,
      listName: data.listName,
      sumName: data.sumName
    }
  }
    
  const { titles = [],  sumName, listName } = getData()
  return (
      <div className={styles.wrap}>
        <div className={fixedTop > 1 ? `${styles.title} ${styles.fixed}` : `${styles.title}`} style={fixedTop > 1 && fixedleft > 10  ? {marginLeft: `${-fixedleft}px`, width: `${titles.length * 85}px`} : active == 1 ? {width: `${titles.length * 85}px`} : {width: `${titles.length * 86}px`}}>
          <tr className={styles.tr}>
            {
              
               titles && titles.length > 0 && titles.map((item, index) => {
                return (
                  <td className={styles.item} key={index}>{item.name}</td>
                )
              })
            }
          </tr>
        </div>
        <div className={styles.content} >
          {data && data.length > 0 && 
            data.map((item, index) => {
              const list = item[listName]
              const sum = item[sumName]
              return (
                <div key={index} className={styles.list}>
                  <tr className={styles.tr} >
                    {
                      sum && <td className={styles.sumItem}><span className={item.show ? `${styles.tagUp}` : `${styles.tag}`}>{sum.dataTypeName}</span></td>
                    }
                    {
                      titles.map((_item, _index) => {
                        return (
                          sum && <td className={styles.item} key={_index}>{sum[_item.key]}</td>
                        )   
                      })
                    }
                  </tr>
                   {
                    list && list.length > 0 && list.map((_item2, _index2) => {
                    return (
                      item.show && <tr className={styles.tr} >
                        <td className={styles.sumItem} ><span className={styles.detail}>{_item2.dataTypeName}</span></td>
                       {
                         titles.map((_item3, _index3) => {
                        return ( <td className={`${styles.item} ${styles.detail}`}><span>{_item2[_item3.key]}</span></td> )   
                      })
                       }
                       </tr>
                     
                    )
                    })
                  }
                </div>
              );
            })
            
            }
            {
              total && <div className={`${styles.list} ${styles.total}`}><tr className={styles.tr} >
                {
                  titles.map((item, index) => {
                    return ( <td key={index} className={styles.item}>{total[item.key]}</td> )   
                  })
                }
                </tr></div>
            }
        </div>
      </div>
  );
});
