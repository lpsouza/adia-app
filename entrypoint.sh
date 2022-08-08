#!/bin/sh

find /usr/src/app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_CORE_API#$NEXT_PUBLIC_CORE_API#g"

echo "Starting Nextjs"
exec "$@"
