import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '../../../../components/common/index';
import UpsertForm from '../../Pharmacy/components/UpsertForm';
import axios from '../../../../services/api/config';
import SettingForm from '../../../../containers/Customers/Clientele/components/SettingForm';
import createForm from 'rc-form/lib/createForm';
import routes from '../../../../routes/constant';
import { getAll } from '../../../../services/api/routes/subscription';
import { Toast } from '../../../../components/common/Toast';
import Tabs, { TabPane } from 'rc-tabs';
import { canPerformAction } from '../../../../util/common';
import 'rc-tabs/assets/index.css';
import { MODULE, SUB_MODULE } from '../../../../constants/subscription';
import { CLIENTELE_TYPE } from '../../../../constants/Customer';
import {
  pharmacyPaginate,
  pharmacyUpsert,
  getSpecificPharmacy,
  pharmacyUpdate,
} from '../../../../services/api/routes/customer';
import { fileUpload } from '../../../../services/api/routes/common';
import Uploader, {
  FILE_CATEGORY,
  FILE_TYPES,
} from '../../../../components/common/Upload/Uploader';
const _ = require('lodash');

const PharmacyTabs = (props) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { form } = props;
  const { validateFields } = form;
  const [getData, setData] = useState({});
  const [pharamcyData, setPharmacyData] = useState([]);
  const [total, setTotal] = useState(0);
  const [subscripData, setSubscripData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('1');
  const [pdfVisible, setPdfVisible] = useState(false);
  const [jsonVisible, setJsonVisible] = useState(false);
  const [pdfData, setPdfData] = useState();


  const [jsonData, setJsonData] = useState();
  let parentPhamracyData = _.find(pharamcyData, { parentId: null });

  const storeData = [
    { name: 'Burlington', id: 1 },
    { name: 'London', id: 2 },
  ];

  useEffect(() => {
    fetchSubscritions();
  }, []);

  useEffect(() => {
    if (props.match.params.id) getPharmacy();
  }, [props.match.params.id]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    let { method, url, baseURL } = pharmacyPaginate;
    axios({ method, url, baseURL })
      .then((data) => {
        if (data.data.code === 'OK') {
          let updatedList = data.data.data.data.filter((x) => !x.parentId);
          setPharmacyData(updatedList);
          setTotal(data.data.data.count);
        }
      })
      .catch((err) => {
        Toast.error(err);
      });
  };

  const fetchSubscritions = () => {
    let { method, url, baseURL } = getAll;
    const data = { sort: { createdAt: -1 }, where: { isActive: true } };
    axios({ method, url, baseURL, data })
      .then((response) => {
        if (response.data.code === 'OK') {
          setSubscripData(response.data.data.data);
        } else {
          Toast.error(response.data.message);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const handlePharmacyUpsert = () => {
    setBtnLoading(true);
    validateFields((error, value) => {
      if (!error) {
        let obj = _.clone(value);
        if (obj) {
          obj.formData = {
            pdfPath: pdfData,
            jsonPath: jsonData,
          };
        }

        if (obj) {
          obj.printer = {
            name: obj.printerName,
            machineId: obj.machineId,
          };
        }

        if (obj.email && _.size(obj.email) > 0) {
          obj.emails = [{ email: obj.email, isPrimary: true }];
        }
        if (obj.fax && _.size(obj.fax) > 0) {
          obj.faxes = [{ fax: obj.fax, isPrimary: true }];
        }
        if (obj) {
          obj.mobiles = [
            {
              mobile: obj.phone,
              countryCode: '91',
              isPrimary: true,
            },
          ];

          obj.addresses = [
            {
              isPrimary: true,
              line1: obj.line1,
              line2: obj.line1,
              city: obj.city,
              province: obj.province,
              country: obj.country,
              postalCode: obj.postalCode,
            },
          ];
        }

        delete obj.email;
        delete obj.fax;
        delete obj.line1;
        delete obj.line2;
        delete obj.postalCode;
        delete obj.province;
        delete obj.country;
        delete obj.city;
        delete obj.printerName;
        delete obj.machineId;

        if ((!pdfData && jsonData) || (pdfData && !jsonData)) {
          Toast.error(`Please upload the ${!jsonData ? 'JSON' : 'PDF'} file.`);
        } else {
          let { method, url, baseURL } = getData._id
            ? pharmacyUpdate
            : pharmacyUpsert;
          url = getData._id ? `${url}/${getData._id}` : url;
          axios({ method, url, data: obj, baseURL })
            .then((response) => {
              if (response && response.data.code == 'OK') {
                Toast.success(response.data.message);
                props.history.push(routes.pharmacy.path);
              }
              setBtnLoading(false);
            })
            .catch((error) => {
              setBtnLoading(false);
              Toast.error(error);
            });
        }
      } else {
        setBtnLoading(false);
        Toast.error('Please fill required fields...!');
      }
    });
  };

  const getPharmacy = () => {
    let { method, url, baseURL } = getSpecificPharmacy;
    url = `${url}/${props.match.params.id}`;
    axios({ method, url, baseURL })
      .then((response) => {
        if (response.data.code == 'OK') {
          setPdfData(response.data.data?.formData?.pdfPath)
          setJsonData(response.data.data?.formData?.jsonPath)
          setData(response.data.data);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleBackRedirect = () => {
    props.history.push(`${routes.pharmacy.path}`);
  };

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  let pharmacySettingParams = {
    moduleId: MODULE.PHARMACY,
    subModuleId: SUB_MODULE.PHARMACY_SETTING,
  };
  return (
    <>
      <div className='pmr_wrap'>
        <div className='container'>
          <div className='page_head'>
            <span
              style={{
                marginBottom: '-1%',
                fontSize: '20px',
                marginLeft: '2px',
              }}
            >
              <b>{props.match.params.id ? 'Edit' : 'Add'} Pharmacy</b>
            </span>
            <Button
              style={{ marginTop: '5px' }}
              size='lg'
              onClick={() => {
                handleBackRedirect();
              }}
            >
              Back
            </Button>
          </div>
          <div className='pmr_list_wrap'>
            <div className='patient_order_wrap' style={{ border: 'none' }}>
              <Tabs
                defaultActiveKey={selectedTab}
                activeKey={selectedTab}
                className='permission_tab_wrap'
                onChange={handleTabChange}
              >
                <TabPane tab='Basic' key='1' className='resi_treat'>
                  <UpsertForm
                    onTabChange={handleTabChange}
                    parentPharmacy={pharamcyData}
                    store={storeData}
                    form={form}
                    editPhamacy={getData}
                    editId={props.match.params.id}
                    onCancel={handleBackRedirect}
                    onSave={handlePharmacyUpsert}
                  // onTabVisible={tabVisible}
                  />
                </TabPane>
                {canPerformAction(pharmacySettingParams, true) ? (
                  <TabPane tab='Setting' key='2' className='resi_treat'>
                    <SettingForm
                      onPdfVisible={() => {
                        setPdfVisible(true);
                      }}
                      onPdfData={pdfData}
                      onJsonData={jsonData}
                      onJsonVisible={() => {
                        setJsonVisible(true);
                      }}
                      form={form}
                      onSave={handlePharmacyUpsert}
                      loading={btnLoading}
                      editId={props.match.params.id}
                      onCancel={handleBackRedirect}
                      subscripData={subscripData}
                      queryData={CLIENTELE_TYPE.PHARMACY}
                      editPhamacy={getData}
                      isPharmacy={true}
                    // onTableVisible={(value) => {
                    //   setTabVisible(value);
                    // }}
                    />
                  </TabPane>
                ) : null}
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {pdfVisible && (
        <Uploader
          visible={pdfVisible}
          onRequestClose={() => setPdfVisible(false)}
          title='Upload PDF file'
          uploadUrl={{ ...fileUpload }}
          allowedTypes={FILE_TYPES.PDF}
          accept={[FILE_TYPES.PDF]}
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.PDF].join(','),
          }}
          uploadUrl={{ ...fileUpload }}
          maxSizeInMB={10}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(response) => {
            if (response.code === 'OK') {
              response &&
                response.data &&
                response.data.length &&
                response.data.map((data) => {
                  return setPdfData(data.path);
                });

              setPdfVisible(false);
            }
          }}
        />
      )}

      {jsonVisible && (
        <Uploader
          visible={jsonVisible}
          onRequestClose={() => setJsonVisible(false)}
          title='Upload JSON file'
          uploadUrl={{ ...fileUpload }}
          accept={[FILE_TYPES.JSON]}
          allowedTypes={FILE_TYPES.JSON}
          accept={[FILE_CATEGORY.JSON].join(',')}
          extraData={{
            isUploadToS3: true,
            category: [FILE_CATEGORY.JSON].join(','),
          }}
          maxSizeInMB={10}
          onError={(err) => {
            Toast.error(err);
          }}
          onSuccess={(response) => {
            if (response.code === 'OK') {
              response &&
                response.data &&
                response.data.length &&
                response.data.map((data) => {
                  return setJsonData(data.path);
                });
              setJsonVisible(false);
            }
          }}
        />
      )}
    </>
  );
};

export default withRouter(createForm()(PharmacyTabs));
