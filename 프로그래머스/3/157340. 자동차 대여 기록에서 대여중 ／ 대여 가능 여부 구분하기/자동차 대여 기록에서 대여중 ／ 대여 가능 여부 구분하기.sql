SELECT
    CAR_ID,
    -- MAX(CASE...)를 사용하여 그룹 내에 '대여중'이 하나라도 있으면 '대여중'을 선택
    MAX(CASE
        -- 시작일이 2022-10-16보다 작거나 같고 (대여가 이미 시작되었거나 16일에 시작)
        -- 반납일이 2022-10-16보다 크거나 같으면 (16일에 반납되더라도 16일은 대여 기간에 포함)
        WHEN DATE(START_DATE) <= '2022-10-16' AND DATE(END_DATE) >= '2022-10-16' 
            THEN '대여중'
        ELSE '대여 가능'
    END) AS AVAILABILITY
FROM
    CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY
    CAR_ID
ORDER BY
    CAR_ID DESC;