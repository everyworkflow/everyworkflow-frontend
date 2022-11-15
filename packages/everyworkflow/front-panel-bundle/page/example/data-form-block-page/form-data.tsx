/*
 * @copyright EveryWorkflow. All rights reserved.
 */

export const FormData = {
    "fields": [
        {
            "label": "Email address",
            "name": "email",
            "field_type": "text_field",
            "input_type": "email",
            "sort_order": 0,
            "_id": "email"
        },
        {
            "label": "Password",
            "name": "password",
            "field_type": "text_field",
            "input_type": "password",
            "sort_order": 0,
            "_id": "password"
        },
        {
            "label": "Description",
            "name": "description",
            "row_count": 5,
            "field_type": "textarea_field",
            "sort_order": 0,
            "_id": "description"
        },
        {
            "label": "Description markdown",
            "name": "description_markdown",
            "field_type": "markdown_field",
            "_id": "description_markdown"
        },
        {
            "label": "Primary color",
            "name": "primary_color",
            "field_type": "color_picker_field",
            "sort_order": 0,
            "_id": "primary_color"
        },
        {
            "label": "Brand logo",
            "name": "brand_logo",
            "field_type": "file_field",
            "sort_order": 0,
            "_id": "brand_logo"
        },
        {
            "label": "Is enabled",
            "name": "is_enabled",
            "field_type": "check_field",
            "sort_order": 0,
            "_id": "is_enabled"
        },
        {
            "label": "Is disabled",
            "name": "is_disabled",
            "field_type": "switch_field",
            "checked_label": "Disabled",
            "unchecked_label": "Enabled",
            "sort_order": 0,
            "_id": "is_disabled"
        },
        {
            "label": "Gender",
            "name": "gender",
            "field_type": "radio_field",
            "options": [
                {
                    "key": "male",
                    "value": "Male"
                },
                {
                    "key": "female",
                    "value": "Female"
                },
                {
                    "key": "other",
                    "value": "Other"
                }
            ],
            "sort_order": 0,
            "_id": "gender"
        },
        {
            "label": "Gender selector",
            "name": "gender_selector",
            "field_type": "select_field",
            "options": [
                {
                    "key": "male",
                    "value": "Male"
                },
                {
                    "key": "female",
                    "value": "Female"
                },
                {
                    "key": "other",
                    "value": "Other"
                }
            ],
            "sort_order": 0,
            "_id": "gender_selector"
        },
        {
            "label": "Gender selector searchable",
            "name": "gender_selector_searchable",
            "field_type": "select_field",
            "is_searchable": true,
            "options": [
                {
                    "key": "male",
                    "value": "Male"
                },
                {
                    "key": "female",
                    "value": "Female"
                },
                {
                    "key": "other",
                    "value": "Other"
                }
            ],
            "sort_order": 0,
            "_id": "gender_selector_searchable"
        },
        {
            "label": "Date of birth",
            "name": "dob",
            "field_type": "date_picker_field",
            "value": "1997-06-02",
            "sort_order": 0,
            "_id": "dob"
        },
        {
            "label": "Time of birth",
            "name": "tob",
            "field_type": "time_picker_field",
            "value": "08:45:16",
            "sort_order": 0,
            "_id": "tob"
        },
        {
            "label": "Deleted at",
            "name": "deleted_at",
            "field_type": "date_time_picker_field",
            "value": "2019-08-12 08:45:16",
            "sort_order": 0,
            "_id": "deleted_at"
        },
        {
            "label": "Leave date range",
            "name": "leave_date_range",
            "field_type": "date_range_picker_field",
            "value": [
                "2019-08-12",
                "2019-08-19"
            ],
            "sort_order": 0,
            "_id": "leave_date_range"
        },
        {
            "label": "Break time range",
            "name": "break_time_range",
            "field_type": "time_range_picker_field",
            "value": [
                "08:15:20",
                "12:25:35"
            ],
            "sort_order": 0,
            "_id": "break_time_range"
        },
        {
            "label": "Black friday sale date range",
            "name": "black_friday_sale_date_range",
            "field_type": "date_time_range_picker_field",
            "value": [
                "2019-08-12 08:45:30",
                "2019-08-26 22:15:30"
            ],
            "sort_order": 0,
            "_id": "black_friday_sale_date_range"
        },
        {
            "label": "Input group field",
            "name": "input_group_field",
            "field_type": "text_field",
            "prefix_text": "https://example.com/",
            "suffix_text": "@example.com",
            "sort_order": 0,
            "_id": "input_group_field"
        },
        {
            "label": "Media image selector",
            "name": "media_image_selector",
            "sort_order": 0,
            "field_type": "media_image_selector_field",
            "_id": "media_image_selector"
        },
        {
            "label": "Media image gallery selector",
            "name": "media_image_gallery_selector",
            "sort_order": 0,
            "field_type": "media_image_gallery_selector_field",
            "_id": "media_image_gallery_selector"
        },
        {
            "label": "Media file selector",
            "name": "media_file_selector",
            "sort_order": 0,
            "field_type": "media_file_selector_field",
            "_id": "media_file_selector"
        }
    ]
};
