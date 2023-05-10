# FROM node:alpine as builder TODO invistigate error:0308010C:digital envelope routines::unsupported
FROM node:16 as builder

# Should comming from CI/CD
ARG REACT_APP_GIT_COMMIT_HASH
COPY . /app/

WORKDIR /app/
RUN yarn
# RUN yarn validate
RUN yarn build-storybook

FROM nginx:latest
ENV PORT=8080
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY cert/oddbox.crt /etc/ssl/oddbox.crt
COPY cert/oddbox.key /etc/ssl/oddbox.key
#Remove 'common' subpath when workflow moved to common project
COPY --from=builder /app/storybook-static /var/www/dist
