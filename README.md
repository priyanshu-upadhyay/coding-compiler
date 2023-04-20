# GLAOnlineCompiler - API Documentation

## Introduction
This API allows you to submit and execute programming code in multiple languages. It provides features like submission_id generation, programming language selection, submission status tracking, and execution output.

## Base URL / IP
172.\_.\_._ (GLA University IP Address)

## API Endpoints

### Submit Code for Execution

Submits the source code for execution and returns the submission id.

```http
POST /submit
```

#### Request Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| programming_language | enum | The programming language used in the code. Currently, supported programming languages are `CPP`, `JAVA`, `PYTHON3`, and `C`. |
| source_code | string | The source code to be executed encoded in base64. |
| input_array | array of strings | An array of inputs encoded in base64. |

##### Sample Request

```http
curl --location '{base_url}/submit' \
--header 'Content-Type: application/json' \
--data '{
"programming_language" : "PYTHON3",
"source_code" : "cHJpbnQoIkhlbGxvIFdvcmxkIik=",
"input_array" : ["MSAyCjQzCjM0NDMKMzQzNDMKMzQ0Mw==", "MQo0MwozNDQz"]
}'
```

#### Response
The API returns the following parameters in JSON format:

| Parameter | Type | Description |
|-----------|------|-------------|
| submission_id | string | A unique identifier for the submission. |
| programming_language | enum | The programming language used in the code. |
| submission_status | enum | The current status of the submission. Possible values are `CREATED`, `IN_PROCESS`, `SUCCESS`, `RETRY`, and `FAILURE`. |
| `date_created` | `string` (ISO 8601 format) | The date and time the submission was created. |
| `date_modified` | `string` (ISO 8601 format) | The date and time the submission was last modified. |

##### Sample Response

```
{
    "submission_id": "56197eb3-706b-43e9-8827-2ca823c43ac7",
    "programming_language": "PYTHON3",
    "submission_status": "CREATED",
    "date_created": "2023-04-19T20:08:57.603Z",
    "date_modified": "2023-04-19T20:08:57.603Z",
}
```

---

### Get Status for Submission

Return the status of the submission id.

```http
GET /status/<submission_id>
```

#### Request Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| submission_id | string | A unique identifier for the submission. |

##### Sample Request

```
curl --location '{base-url}/status/56197eb3-706b-43e9-8827-2ca823c43ac7'
```

#### Response
The API returns the following parameters in JSON format:

| Parameter | Type | Description |
|-----------|------|-------------|
| submission_id | string | A unique identifier for the submission. |
| programming_language | enum | The programming language used in the code. |
| submission_status | enum | The current status of the submission. Possible values are `CREATED`, `IN_PROCESS`, `SUCCESS`, `RETRY`, and `FAILURE`. |
| source_code | string | The source code to be executed. |
| input_array | array of strings | The input values provided for the code to be executed. |
| compilation_error | string or null | The error generated during compilation, if any. |
| execution_status | array of enum | The status of each execution. Possible values are `MEMORY_LIMIT_EXCEEDED`, `RUNTIME_ERROR`, `SUCCESSFUL_EXECUTION`, `TIME_LIMIT_EXCEEDED`, `OUTPUT_LIMIT_EXCEEDED`, `UNKNOWN_EXECUTION_ERROR`. <br /> <br /> This will be an empty array if the program has not started running yet or having compilation error.
| execution_output | string array (base64-encoded) | The output of the program, if it has started running. This will be an empty array if the program has not started running yet or having compilation error. |
| date_created | `string` (ISO 8601 format) | The date and time the submission was created. |
| date_modified | `string` (ISO 8601 format) | The date and time the submission was last modified. |
| metadata | string | Any additional metadata associated with the submission. (Eg. Error Payload genrated by compiler backend engine) |

##### Sample Response

```
{
    "submission_id": "56197eb3-706b-43e9-8827-2ca823c43ac7",
    "programming_language": "PYTHON3",
    "submission_status": "SUCCESS",
    "source_code" : "cHJpbnQoIkhlbGxvIFdvcmxkIik=",
    "input_array" : ["MSAyCjQzCjM0NDMKMzQzNDMKMzQ0Mw==", "MQo0MwozNDQz"]
    "compilation_error": null,
    "execution_status": ["SUCCESSFUL_EXECUTION", "SUCCESSFUL_EXECUTION"],
    "execution_output": ["SGVsbG8gV29ybGQ=", "SGVsbG8gV29ybGQ="],
    "date_created": "2023-04-19T20:08:57.603Z",
    "date_modified": "2023-04-19T20:08:57.603Z",
    "metadata": null
}
```

---
### Enums for Status Mapping

#### SubmissionStatus

The `submission_status` field can be one of the following:

- `CREATED`
- `IN_PROCESS`
- `SUCCESS`
- `RETRY`
- `FAILURE`

#### ExecutionStatus

The `execution_status` field is an array of strings representing the current execution status of the program. It can contain one or more of the following:

- `MEMORY_LIMIT_EXCEEDED`
- `RUNTIME_ERROR`
- `SUCCESSFUL_EXECUTION`
- `TIME_LIMIT_EXCEEDED`
- `OUTPUT_LIMIT_EXCEEDED`
- `UNKNOWN_EXECUTION_ERROR`
