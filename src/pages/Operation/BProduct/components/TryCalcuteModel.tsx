import type { TableListItem } from '@/pages/Operation/BProduct/data';
import type { tryCalcuteType } from '@/pages/Operation/BProduct/Detail';
import { Button, Col, Modal, Row, Statistic, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

export type FormProps = {
  onOk: () => void;
  modalVisible: boolean;
  record: TableListItem;
};

/**
 *
 * @param props
 * @constructor
 */
const TryCalcuteModel: React.FC<FormProps> = (props) => {
  /** 试算model */
  const [tryCalcuteData, setTryCalcuteData] = useState<tryCalcuteType>({
    borrowAmount: 0,
    repayAmount: 0,
    loanAmount: 0,
    serviceFee: 0,
    intersetFee: 0,
    violateFee: 0,
    overdueAmount: 0,
    settlementType: 1,
  });
  const tryCalcuteDataTmp: tryCalcuteType = {
    borrowAmount: 0,
    repayAmount: 0,
    loanAmount: 0,
    serviceFee: 0,
    intersetFee: 0,
    violateFee: 0,
    settlementType: 1,
    overdueAmount: 0,
  };
  useEffect(() => {
    // 相当于 componentDidMount
    console.log(props.record!);
    if (props.record?.c_amount) {
      // 判断结算方式
      tryCalcuteDataTmp.repayAmount = props.record!.c_amount;
      switch (props!.record.f_settlement_type!) {
        case 1:
          tryCalcuteDataTmp.loanAmount =
            props.record!.c_amount *
            (1 - props.record!.h_service_fee_rate! / 100 - props.record!.g_interest! / 100);
          break;
        case 2:
          tryCalcuteDataTmp.loanAmount =
            props.record!.c_amount * (1 - props.record!.h_service_fee_rate! / 100);
          break;
        case 3:
          tryCalcuteDataTmp.loanAmount = props.record!.c_amount;
          break;
      }
      tryCalcuteDataTmp.borrowAmount = props.record!.c_amount;
      tryCalcuteDataTmp.serviceFee =
        (props.record!.c_amount * props.record!.h_service_fee_rate!) / 100;
      tryCalcuteDataTmp.intersetFee = (props.record!.c_amount * props.record!.g_interest!) / 100;
      tryCalcuteDataTmp.violateFee =
        (props.record!.c_amount * props.record!.j_violate_fee_rate!) / 100;
      tryCalcuteDataTmp.overdueAmount =
        (props.record!.c_amount * props.record!.i_overdue_rate!) / 100;
      tryCalcuteDataTmp.settlementType = props.record!.f_settlement_type!;
      setTryCalcuteData(tryCalcuteDataTmp);
    }

    return () => {};
  }, [props.record]);

  return (
    <Modal
      title="试算"
      visible={props.modalVisible}
      onOk={props.onOk}
      onCancel={props.onOk}
      width="90%"
      destroyOnClose={true}
      footer={[
        <Button key="submit" type="primary" onClick={props.onOk}>
          知道了
        </Button>,
      ]}
    >
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="借款金额" value={tryCalcuteData.borrowAmount} />
        </Col>
        <Col span={4}>
          <Statistic title="放款金额" value={tryCalcuteData.loanAmount} suffix="" />
        </Col>
        <Col span={4}>
          <Statistic
            title={
              <>服务费 {tryCalcuteData.settlementType != 3 ? <Tag color="red">头收</Tag> : ''}</>
            }
            value={tryCalcuteData.serviceFee}
          />
        </Col>
        <Col span={4}>
          <Statistic
            title={
              <>利息 {tryCalcuteData.settlementType == 1 ? <Tag color="red">头收</Tag> : ''}</>
            }
            value={tryCalcuteData.intersetFee}
            suffix=""
          />
        </Col>
        <Col span={4}>
          <Statistic title="违约金" value={tryCalcuteData.violateFee} suffix="" />
        </Col>
        <Col span={4}>
          <Statistic title="罚息" value={tryCalcuteData.overdueAmount} suffix="/日" />
        </Col>
      </Row>
    </Modal>
  );
};

export default TryCalcuteModel;
