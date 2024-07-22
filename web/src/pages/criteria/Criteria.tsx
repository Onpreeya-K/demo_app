import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import {
    DataGrid,
    GridColDef
} from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { getCriteriaOfTeach } from '../../services/Criteria-service';

interface Course {
    criteria_of_teach_id: number;
    course_of_study_id: number;
    level_id: number;
    teaching_rates: number;
    rate_unit: number;
    course_of_study: {
        course_of_study_id: number;
        department_id: number;
        degree_id: number;
        name: string;
    };
    level: {
        level_id: number;
        name: string;
    };
}

interface EducationData {
    bachelor: Course[];
    master: Course[];
    doctor: Course[];
    master_inter: Course[];
    doctor_inter: Course[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CriteriaPage = () => {
    const startPage = useRef(false);

    const [data, setData] = useState<EducationData>();

    const fetchCriteriaOfTeach = async () => {
        try {
            const response = await getCriteriaOfTeach();
            if (response && response.message === 'success') {
                setData(response.payload);
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (startPage.current === false) {
            fetchCriteriaOfTeach();
            startPage.current = true;
        }
    });

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }

    const columns: GridColDef[] = [
        {
            field: 'course_name',
            headerName: 'หลักสูตร',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
        {
            field: 'level_name',
            headerName: 'ระดับ',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
        {
            field: 'teaching_rates',
            headerName: 'ค่าบริหารการศึกษา',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
        {
            field: 'rate_unit',
            headerName: 'อัตราค่าสอน/หัว/หน่วยกิต',
            flex: 1,
            sortable: false,
            resizable: false,
            disableColumnMenu: true,
        },
    ];

    const formatCourses = (courses: Course[]) => {
        return courses.map((course) => ({
            id: course.criteria_of_teach_id,
            course_name: course.course_of_study.name,
            level_name: course.level.name,
            teaching_rates: course.teaching_rates,
            rate_unit: course.rate_unit,
        }));
    };

    return (
        <div>
            <Box sx={{ height: '100%' }}>
                <div>
                    <Typography textAlign="start" variant="h6" component="div">
                        เกณฑ์ค่าสอน
                    </Typography>
                    <Divider />
                </div>
                {data && (
                    <div>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="ระดับปริญญาตรี" {...a11yProps(0)} />
                            <Tab label="ระดับมหาบัณฑิต" {...a11yProps(1)} />
                            <Tab
                                label="ระดับปริญญาดุษฎีบัณฑิต"
                                {...a11yProps(2)}
                            />
                            <Tab
                                label="ระดับมหาบัณฑิต (นิสิตต่างชาติ)"
                                {...a11yProps(3)}
                            />
                            <Tab
                                label="ระดับปริญญาดุษฎีบัณฑิต (นิสิตต่างชาติ)"
                                {...a11yProps(4)}
                            />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <DataGrid
                                rows={formatCourses(data.bachelor)}
                                columns={columns}
                                getRowId={(row) => row.id}
                                autoHeight
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <DataGrid
                                rows={formatCourses(data.master)}
                                columns={columns}
                                getRowId={(row) => row.id}
                                autoHeight
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <DataGrid
                                rows={formatCourses(data.doctor)}
                                columns={columns}
                                getRowId={(row) => row.id}
                                autoHeight
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <DataGrid
                                rows={formatCourses(data.master_inter)}
                                columns={columns}
                                getRowId={(row) => row.id}
                                autoHeight
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <DataGrid
                                rows={formatCourses(data.doctor_inter)}
                                columns={columns}
                                getRowId={(row) => row.id}
                                autoHeight
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </TabPanel>
                    </div>
                )}
            </Box>
        </div>
    );
};

export default CriteriaPage;
