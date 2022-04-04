import styles from './Footbar.module.css'
import {EditOutlined,DragOutlined,ZoomInOutlined,ZoomOutOutlined,
    ExpandOutlined,EyeOutlined} from "@ant-design/icons"
//import { Button, Switch, Tooltip } from 'antd';
//선택모드
//import CommonButton from '../../components/common/CommonButton';
//<EditOutlined />
//그랩모드
//<DragOutlined />
//줌인
//<ZoomInOutlined />
//줌아웃
//<ZoomOutOutlined />
//비율에 맞추기
//<ExpandOutlined />
//미리보기
//<Switch checkedChildren="1" unCheckedChildren="0" />
//<ExpandAltOutlined />
//<EyeOutlined />

const Footbar=()=>{
    return(
        <div className={styles.footbar}>
            <div className={styles.contents}>
                <h2 className={styles.title}>
                </h2>
                <button>
                    <EditOutlined />선택모드
                </button>
                <button>
                    <DragOutlined />그랩모드
                </button>
                <button>
                    <ZoomOutOutlined />줌아웃
                </button>
                <button>
                    <ZoomInOutlined />줌인
                </button>
                <button>
                    <ExpandOutlined />비율에 맞추기
                </button>
                <button>
                    <EyeOutlined />미리보기
                </button>
                
            </div>
        </div>
    )
}

export default Footbar;
