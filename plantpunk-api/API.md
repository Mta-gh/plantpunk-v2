# PlantPunk API Documentation

**Version:** `v1`
**Base URL:** `https://your-domain.com/api/v1`

---

## Overview

The PlantPunk API is a RESTful JSON API for managing and retrieving houseplant data. All responses are returned in JSON format wrapped in a `data` key.

### Response Format

**Collection response:**

```json
{
  "data": [
    { ... },
    { ... }
  ]
}
```

**Single resource response:**

```json
{
  "data": { ... }
}
```

### Rate Limiting

All API endpoints are rate-limited to **60 requests per minute** per IP address. Exceeding this limit returns a `429 Too Many Requests` response.

| Header                  | Description                          |
|-------------------------|--------------------------------------|
| `X-RateLimit-Limit`     | Maximum requests per window          |
| `X-RateLimit-Remaining` | Remaining requests in current window |
| `Retry-After`           | Seconds until the window resets      |

### Error Responses

Errors follow a consistent structure:

```json
{
  "message": "Not Found"
}
```

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | Success                                          |
| `404`       | Resource not found                               |
| `429`       | Rate limit exceeded                              |
| `500`       | Internal server error                            |

---

## Authentication

The public API (`v1`) does **not** require authentication. All endpoints listed below are openly accessible.

---

## Endpoints

### Settings

#### Get Application Settings

Returns the application name and current API version.

```
GET /settings
```

**Parameters:** None

**Response** `200 OK`

```json
{
  "name": "plantPunkOS",
  "version": "0.1.0"
}
```

---

### Plants

#### List All Plants

Returns a collection of all plants with their category and tags.

```
GET /plants
```

**Parameters:** None

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Monstera Deliciosa",
      "scientific_name": "Monstera deliciosa",
      "slug": "monstera-deliciosa",
      "description": "Large climbing plant with striking split leaves.",
      "tips": "Mist regularly to increase humidity.",
      "image": "plants/monstera-deliciosa.jpg",
      "category": {
        "id": 1,
        "name": "Araceae",
        "slug": "araceae"
      },
      "tags": [
        {
          "id": 1,
          "name": "Trailing",
          "slug": "trailing"
        }
      ],
      "light": {
        "value": "bright_indirect",
        "label": "Bright Indirect",
        "icon": "heroicon-o-sun"
      },
      "watering": {
        "value": "weekly",
        "label": "Weekly",
        "icon": "heroicon-o-beaker"
      },
      "watering_info": "Allow soil to dry between waterings.",
      "humidity": {
        "value": "high",
        "label": "High",
        "icon": "heroicon-o-plus-circle"
      },
      "difficulty": {
        "value": "beginner",
        "label": "Beginner",
        "icon": "heroicon-o-face-smile"
      },
      "substrate": "Well-draining potting mix with perlite.",
      "temperature_min": 65,
      "temperature_max": 75,
      "toxic_to_pets": true
    }
  ]
}
```

---

#### Get Plant by Slug

Returns a single plant by its URL-friendly slug.

```
GET /plants/{slug}
```

**Path Parameters:**

| Parameter | Type     | Required | Description                              |
|-----------|----------|----------|------------------------------------------|
| `slug`    | `string` | Yes      | The URL-friendly identifier of the plant |

**Response** `200 OK`

```json
{
  "data": {
    "id": 1,
    "name": "Monstera Deliciosa",
    "scientific_name": "Monstera deliciosa",
    "slug": "monstera-deliciosa",
    "description": "Large climbing plant with striking split leaves.",
    "tips": "Mist regularly to increase humidity.",
    "image": "plants/monstera-deliciosa.jpg",
    "category": {
      "id": 1,
      "name": "Araceae",
      "slug": "araceae"
    },
    "tags": [
      {
        "id": 1,
        "name": "Trailing",
        "slug": "trailing"
      }
    ],
    "light": {
      "value": "bright_indirect",
      "label": "Bright Indirect",
      "icon": "heroicon-o-sun"
    },
    "watering": {
      "value": "weekly",
      "label": "Weekly",
      "icon": "heroicon-o-beaker"
    },
    "watering_info": "Allow soil to dry between waterings.",
    "humidity": {
      "value": "high",
      "label": "High",
      "icon": "heroicon-o-plus-circle"
    },
    "difficulty": {
      "value": "beginner",
      "label": "Beginner",
      "icon": "heroicon-o-face-smile"
    },
    "substrate": "Well-draining potting mix with perlite.",
    "temperature_min": 65,
    "temperature_max": 75,
    "toxic_to_pets": true
  }
}
```

**Error** `404 Not Found`

```json
{
  "message": "Not Found"
}
```

**Example:**

```bash
curl https://your-domain.com/api/v1/plants/monstera-deliciosa
```

---

### Categories

#### List All Categories

Returns a collection of all plant categories.

```
GET /categories
```

**Parameters:** None

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Araceae",
      "slug": "araceae"
    },
    {
      "id": 2,
      "name": "Cactaceae",
      "slug": "cactaceae"
    }
  ]
}
```

---

### Tags

#### List All Tags

Returns a collection of all plant tags.

```
GET /tags
```

**Parameters:** None

**Response** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "name": "Trailing",
      "slug": "trailing"
    },
    {
      "id": 2,
      "name": "Low Light",
      "slug": "low-light"
    }
  ]
}
```

---

## Data Reference

### Plant Object

| Field             | Type              | Nullable | Description                                 |
|-------------------|-------------------|----------|---------------------------------------------|
| `id`              | `integer`         | No       | Unique identifier                           |
| `name`            | `string`          | No       | Common name of the plant                    |
| `scientific_name` | `string`          | Yes      | Botanical / Latin name                      |
| `slug`            | `string`          | No       | URL-friendly identifier (unique)            |
| `description`     | `string`          | Yes      | General description                         |
| `tips`            | `string`          | Yes      | Care tips and advice                        |
| `image`           | `string`          | Yes      | Relative path to the plant image            |
| `category`        | `Category`        | Yes      | The plant's category                        |
| `tags`            | `Tag[]`           | No       | Array of associated tags (can be empty)     |
| `light`           | `EnumField`       | Yes      | Light requirements                          |
| `watering`        | `EnumField`       | Yes      | Watering frequency                          |
| `watering_info`   | `string`          | Yes      | Additional watering instructions            |
| `humidity`        | `EnumField`       | Yes      | Humidity preference                         |
| `difficulty`      | `EnumField`       | Yes      | Care difficulty level                       |
| `substrate`       | `string`          | Yes      | Recommended soil / substrate                |
| `temperature_min` | `integer`         | Yes      | Minimum temperature in °F                   |
| `temperature_max` | `integer`         | Yes      | Maximum temperature in °F                   |
| `toxic_to_pets`   | `boolean`         | No       | Whether the plant is toxic to pets          |

### Category Object

| Field  | Type      | Nullable | Description                      |
|--------|-----------|----------|----------------------------------|
| `id`   | `integer` | No       | Unique identifier                |
| `name` | `string`  | No       | Category name                    |
| `slug` | `string`  | No       | URL-friendly identifier (unique) |

### Tag Object

| Field  | Type      | Nullable | Description                      |
|--------|-----------|----------|----------------------------------|
| `id`   | `integer` | No       | Unique identifier                |
| `name` | `string`  | No       | Tag name                         |
| `slug` | `string`  | No       | URL-friendly identifier (unique) |

### EnumField Object

Enum fields represent a selectable value with a human-readable label and an icon reference.

| Field   | Type     | Description                              |
|---------|----------|------------------------------------------|
| `value` | `string` | Machine-readable enum value              |
| `label` | `string` | Human-readable display label             |
| `icon`  | `string` | Heroicon reference for UI rendering      |

### Enum Values

#### Light

| Value             | Label             |
|-------------------|-------------------|
| `low`             | Low Light         |
| `medium`          | Medium Light      |
| `bright_indirect` | Bright Indirect   |
| `direct_sun`      | Direct Sun        |

#### Watering

| Value          | Label        |
|----------------|--------------|
| `rarely`       | Rarely       |
| `weekly`       | Weekly       |
| `twice_weekly` | Twice Weekly |
| `frequent`     | Frequent     |

#### Humidity

| Value    | Label  |
|----------|--------|
| `low`    | Low    |
| `medium` | Medium |
| `high`   | High   |

#### Difficulty

| Value          | Label        |
|----------------|--------------|
| `beginner`     | Beginner     |
| `intermediate` | Intermediate |
| `advanced`     | Advanced     |

---

## Quick Reference

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| `GET`  | `/settings`          | App settings         |
| `GET`  | `/plants`            | List all plants      |
| `GET`  | `/plants/{slug}`     | Get plant by slug    |
| `GET`  | `/categories`        | List all categories  |
| `GET`  | `/tags`              | List all tags        |

---

## CORS

Cross-Origin Resource Sharing is enabled. By default, all origins and methods are permitted.

| Header                         | Value |
|--------------------------------|-------|
| `Access-Control-Allow-Origin`  | `*`   |
| `Access-Control-Allow-Methods` | `*`   |
